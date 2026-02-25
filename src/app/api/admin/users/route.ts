import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SAFE_SELECT = { id: true, email: true, name: true, role: true, createdAt: true };

export async function GET() {
    const users = await prisma.adminUser.findMany({
        select: SAFE_SELECT,
        orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const { email, name, password, role } = await req.json();
    if (!email || !name || !password) {
        return NextResponse.json({ error: 'email, name and password are required' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    try {
        const user = await prisma.adminUser.create({
            data: { email, name, password: hashed, role: role ?? 'admin' },
            select: SAFE_SELECT,
        });
        return NextResponse.json(user, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
    const { id, name, role, password } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const data: Record<string, string> = {};
    if (name) data.name = name;
    if (role) data.role = role;
    if (password) data.password = await bcrypt.hash(password, 12);

    const user = await prisma.adminUser.update({
        where: { id },
        data,
        select: SAFE_SELECT,
    });
    return NextResponse.json(user);
}
