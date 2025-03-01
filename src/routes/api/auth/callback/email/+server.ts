// src/routes/api/auth/callback/email/+server.ts
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('token');
	const email = url.searchParams.get('email');

	if (!token || !email) {
		throw new Error('Invalid token or email'); // Or redirect to an error page
	}

	// Verify the token (and that it hasn't expired)
	const verificationToken = await prisma.verificationToken.findUnique({
		where: {
			identifier_token: {
				identifier: email,
				token: token,
			},
		},
	});

	if (!verificationToken || verificationToken.expires < new Date()) {
		// Delete the expired token
        if (verificationToken) {
            await prisma.verificationToken.delete({
                where: {
                    identifier_token: {
                        identifier: email,
                        token: token
                    }
                }
            });
        }
		throw new Error('Invalid or expired token'); // Or redirect to an error page
	}

	// Get the user associated with the email
	let user = await prisma.user.findUnique({
		where: { email: email },
	});

	// If the user doesn't exist, create them
	if (!user) {
		user = await prisma.user.create({
			 {
				email: email,
			},
		});
	}

	// Delete the verification token (it's a one-time use token)
	await prisma.verificationToken.delete({
		where: {
			identifier_token: {
				identifier: email,
				token: token,
			},
		},
	});

	// Redirect the user to the /tasks page
	throw redirect(302, '/tasks');
};

