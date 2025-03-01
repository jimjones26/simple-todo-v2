import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendMagicLinkEmail } from '$lib/server/email';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	// In a real implementation, you would generate a token here and pass it to sendMagicLinkEmail
	const token = 'dummy-token'; // Replace with actual token generation

	await sendMagicLinkEmail({ email, token });

	return json({ email });
};
