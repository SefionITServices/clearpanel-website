import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt, COOKIE_NAME } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const payload = await verifyJwt(token);
    if (!payload) return NextResponse.json({ user: null }, { status: 401 });

    const user = await prisma.adminUser.findUnique({
        where: { id: payload.id },
        select: { id: true, email: true, name: true, role: true },
    });

    if (!user) return NextResponse.json({ user: null }, { status: 401 });
    return NextResponse.json({ user });
}
