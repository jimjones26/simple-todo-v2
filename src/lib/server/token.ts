// src/lib/server/token.ts
import crypto from 'crypto';
import { prisma } from '$lib/server/prisma';

export async function generateToken(email: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    //store the token in the database, associated with the user's email
    //You could add an expiry date, too.
    await prisma.verificationToken.create({
        data: {
            identifier: email,
            token: token,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Expires in 24 hours
        }
    });

    return token;
}
