import { test, expect, vi } from 'vitest';

vi.mock('$lib/server/email', () => ({
  sendMagicLinkEmail: vi.fn(),
}));

import { sendMagicLinkEmail } from '$lib/server/email';
import { POST } from '../../../routes/api/auth/signin/email/+server';


test('POST /api/auth/signin/email sends magic link email', async () => {
  const mockEmail = 'test@example.com';

  //This is needed because we do not have a running server in the integration test
  const mockRequest = new Request('http://localhost/api/auth/signin/email', {
    method: 'POST',
    body: JSON.stringify({ email: mockEmail }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Simulate a POST request.  We're not actually making a network call,
  // but we're creating an object that *looks* like the request SvelteKit
  // would receive.  This requires a full implementation of the endpoint.
  const response = await POST({ request: mockRequest } as any); // Cast to 'any' to bypass type checking

  // Assert that sendMagicLinkEmail was called with the correct arguments.
  expect(sendMagicLinkEmail).toHaveBeenCalledWith(expect.objectContaining({
    email: mockEmail,
    token: expect.any(String),
  }));

    // Assert on the response.
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ email: mockEmail });
});
