// src/hooks.server.ts
import { SvelteKitAuth } from '@auth/sveltekit';
import EmailProvider from '@auth/core/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/server/prisma';
import { sendMagicLinkEmail } from '$lib/server/email'; // Import your email function
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        // This is required by EmailProvider, but we're not using an SMTP server
        host: '',
        port: 0,
        auth: { user: '', pass: '' },
      },
      from: '', // Set a "from" address, even though it won't be used
      sendVerificationRequest: ({ identifier: email, url }) => {
        // Extract the token from the URL provided by Auth.js
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
  session: {
    strategy: 'jwt', // Use JWT for sessions
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
