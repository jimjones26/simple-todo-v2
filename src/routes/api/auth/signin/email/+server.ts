import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendMagicLinkEmail } from '$lib/server/email';
import { generateToken } from '$lib/server/token';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	const token = await generateToken(email);

	await sendMagicLinkEmail({ email, token });

	return json({ email });
};
