import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2] ?? 'admin@clearpanel.net';
    const name = process.argv[3] ?? 'Admin';
    const password = process.argv[4] ?? 'changeme123!';

    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
        console.log(`Admin user ${email} already exists. Skipping.`);
        return;
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.adminUser.create({
        data: { email, name, password: hashed, role: 'superadmin' },
    });

    console.log(`✅ Admin user created:`);
    console.log(`   Email:    ${user.email}`);
    console.log(`   Name:     ${user.name}`);
    console.log(`   Role:     ${user.role}`);
    console.log(`   Password: ${password}`);
    console.log(`\n⚠️  Change your password immediately after first login!`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
