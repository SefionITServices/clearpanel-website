import { SignJWT, jwtVerify } from 'jose';

const getSecret = () =>
    new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-secret-change-in-production-please');

export const COOKIE_NAME = 'admin_token';
const EXPIRY = '8h';

export interface AdminPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}

export async function signJwt(payload: AdminPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(EXPIRY)
        .sign(getSecret());
}

export async function verifyJwt(token: string): Promise<AdminPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());
        return payload as unknown as AdminPayload;
    } catch {
        return null;
    }
}
