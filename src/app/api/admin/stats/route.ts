import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
        totalCustomers,
        newCustomersThisMonth,
        activeSubscriptions,
        canceledThisMonth,
        activeForMrr,
        recentSubscriptions,
    ] = await Promise.all([
        prisma.customer.count(),
        prisma.customer.count({ where: { createdAt: { gte: monthStart } } }),
        prisma.subscription.count({ where: { status: 'active' } }),
        prisma.subscription.count({
            where: { status: 'canceled', canceledAt: { gte: monthStart } },
        }),
        prisma.subscription.findMany({
            where: { status: 'active' },
            select: { amount: true, interval: true },
        }),
        prisma.subscription.findMany({
            take: 8,
            orderBy: { createdAt: 'desc' },
            include: {
                customer: { select: { email: true, name: true } },
            },
        }),
    ]);

    // MRR in cents
    const mrr = activeForMrr.reduce((sum, s) => {
        return sum + (s.interval === 'year' ? Math.round(s.amount / 12) : s.amount);
    }, 0);

    // Previous month subscriptions for comparison
    const prevMonthActive = await prisma.subscription.count({
        where: {
            status: 'active',
            createdAt: { gte: prevMonthStart, lt: monthStart },
        },
    });

    return NextResponse.json({
        totalCustomers,
        newCustomersThisMonth,
        activeSubscriptions,
        canceledThisMonth,
        mrr,
        prevMonthActive,
        recentSubscriptions,
    });
}
