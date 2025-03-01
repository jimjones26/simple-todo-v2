// src/hooks.server.ts
import { SvelteKitAuth } from '@auth/sveltekit';
import EmailProvider from '@auth/core/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/server/prisma';
import { sendMagicLinkEmail } from '$lib/server/email';
import type { Handle } from '@sveltejs/kit';

export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: { // This is required by EmailProvider, but we're not using an SMTP server
        host: '',
        port: 0,
        auth: { user: '', pass: '' }
      },
      from: '', // Set a "from" address, even though it won't be used
      sendVerificationRequest: ({ identifier: email, url }) => {
        const token = url.split('token=')[1];
        return sendMagicLinkEmail({ email, token });
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // Add the user's ID to the session
      }
      return session;
    },
  },
    trustHost: true, //needed for sveltekit
    secret: process.env.AUTH_SECRET, //needed for sveltekit
});

