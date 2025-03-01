// src/lib/server/email.ts
import fs from 'fs/promises';
import path from 'path';

export async function sendMagicLinkEmail({ email, token }: { email: string; token: string }) {
  console.log(`Sending magic link to ${email} with token ${token}`);

  if (process.env.NODE_ENV === 'development') {
    const tokenFilePath = path.join(process.cwd(), 'tmp', 'magicLinkToken.txt');
    console.log(`Writing token to ${tokenFilePath}`);
    await fs.mkdir(path.dirname(tokenFilePath), { recursive: true }); // Ensure 'tmp' directory exists
    await fs.writeFile(tokenFilePath, token, 'utf-8');
  } else {
    // TODO: Implement actual email sending in production (e.g., using Nodemailer, SendGrid, etc.)
    console.warn('Email sending is not implemented in production yet.');
  }
}
