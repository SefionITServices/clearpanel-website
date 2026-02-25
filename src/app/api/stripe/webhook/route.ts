import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Required for reading raw body from Stripe
export const runtime = 'nodejs';

async function upsertCustomer(stripeCustomer: Stripe.Customer) {
    return prisma.customer.upsert({
        where: { stripeCustomerId: stripeCustomer.id },
        create: {
            stripeCustomerId: stripeCustomer.id,
            email: stripeCustomer.email ?? '',
            name: stripeCustomer.name ?? undefined,
        },
        update: {
            email: stripeCustomer.email ?? '',
            name: stripeCustomer.name ?? undefined,
        },
    });
}

async function upsertSubscription(sub: Stripe.Subscription, dbCustomerId: string) {
    const item = sub.items.data[0];
    const price = item.price;
    const plan = sub.metadata?.plan?.startsWith('starter') ? 'starter' : 'custom';
    // stripe API ≥2024-09-30 renamed these; cast to any for forward compat
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = sub as any;
    const periodStart = new Date((s.current_period_start ?? s.billing_cycle_anchor ?? 0) * 1000);
    const periodEnd = new Date((s.current_period_end ?? s.billing_cycle_anchor ?? 0) * 1000);

    await prisma.subscription.upsert({
        where: { stripeSubscriptionId: sub.id },
        create: {
            stripeSubscriptionId: sub.id,
            customerId: dbCustomerId,
            stripePriceId: price.id,
            plan,
            status: sub.status,
            amount: price.unit_amount ?? 0,
            currency: price.currency,
            interval: price.recurring?.interval ?? 'month',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
            cancelAtPeriodEnd: s.cancel_at_period_end ?? false,
            canceledAt: s.canceled_at ? new Date(s.canceled_at * 1000) : null,
            trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
        },
        update: {
            status: sub.status,
            stripePriceId: price.id,
            amount: price.unit_amount ?? 0,
            interval: price.recurring?.interval ?? 'month',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
            cancelAtPeriodEnd: s.cancel_at_period_end ?? false,
            canceledAt: s.canceled_at ? new Date(s.canceled_at * 1000) : null,
            trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
        },
    });
}

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
        return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
    }

    let event: Stripe.Event;
    const body = await req.text();

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    // Idempotency — skip already-processed events
    const existing = await prisma.webhookEvent.findUnique({ where: { stripeId: event.id } });
    if (existing?.processed) return NextResponse.json({ received: true });

    await prisma.webhookEvent.upsert({
        where: { stripeId: event.id },
        create: { stripeId: event.id, type: event.type },
        update: {},
    });

    try {
        switch (event.type) {
            case 'customer.created':
            case 'customer.updated': {
                await upsertCustomer(event.data.object as Stripe.Customer);
                break;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted': {
                const sub = event.data.object as Stripe.Subscription;
                const stripeCustomer = await stripe.customers.retrieve(
                    sub.customer as string,
                ) as Stripe.Customer;

                let dbCustomer = await prisma.customer.findUnique({
                    where: { stripeCustomerId: stripeCustomer.id },
                });
                if (!dbCustomer) {
                    dbCustomer = await upsertCustomer(stripeCustomer);
                }

                await upsertSubscription(sub, dbCustomer.id);
                break;
            }
        }

        await prisma.webhookEvent.update({
            where: { stripeId: event.id },
            data: { processed: true },
        });
    } catch (err) {
        await prisma.webhookEvent.update({
            where: { stripeId: event.id },
            data: { error: String(err) },
        });
        return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
