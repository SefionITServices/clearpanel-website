import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const status = searchParams.get('status');
    const plan = searchParams.get('plan');
    const q = searchParams.get('q') ?? '';
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = 20;

    const where: Record<string, unknown> = {};
    if (status && status !== 'all') where.status = status;
    if (plan && plan !== 'all') where.plan = plan;
    if (q) {
        where.customer = { OR: [{ email: { contains: q } }, { name: { contains: q } }] };
    }

    const [total, items] = await Promise.all([
        prisma.subscription.count({ where }),
        prisma.subscription.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                customer: { select: { id: true, email: true, name: true } },
            },
        }),
    ]);

    return NextResponse.json({ total, page, limit, totalPages: Math.ceil(total / limit), items });
}
