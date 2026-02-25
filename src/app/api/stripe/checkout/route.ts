import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PLAN_PRICES: Record<string, string | undefined> = {
    starter_monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY,
    starter_yearly: process.env.STRIPE_PRICE_STARTER_YEARLY,
};

export async function GET(req: NextRequest) {
    const plan = req.nextUrl.searchParams.get('plan') ?? 'starter_monthly';
    const priceId = PLAN_PRICES[plan];

    if (!priceId) {
        return NextResponse.json({ error: 'Invalid plan or price not configured' }, { status: 400 });
    }

    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        allow_promotion_codes: true,
        subscription_data: {
            metadata: { plan },
        },
    });

    return NextResponse.redirect(session.url!);
}
