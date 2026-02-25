import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const q = searchParams.get('q') ?? '';
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = 20;

    const where = q
        ? { OR: [{ email: { contains: q } }, { name: { contains: q } }] }
        : {};

    const [total, items] = await Promise.all([
        prisma.customer.count({ where }),
        prisma.customer.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                subscriptions: {
                    select: { plan: true, status: true, amount: true, interval: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        }),
    ]);

    return NextResponse.json({ total, page, limit, totalPages: Math.ceil(total / limit), items });
}

export async function PATCH(req: NextRequest) {
    const { id, notes, tags } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const updated = await prisma.customer.update({
        where: { id },
        data: {
            notes: notes ?? undefined,
            tags: Array.isArray(tags) ? JSON.stringify(tags) : tags ?? undefined,
        },
    });
    return NextResponse.json(updated);
}
