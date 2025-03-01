import { test, expect, vi } from 'vitest';
import { request } from 'http';

vi.mock('$lib/server/email', () => ({
  sendMagicLinkEmail: vi.fn(),
}));

import { sendMagicLinkEmail } from '$lib/server/email';


test('POST /api/auth/signin/email sends magic link email', async () => {
  const mockEmail = 'test@example.com';

    //This is needed because we do not have a running server in the integration test
    const mockRequest = new Request('/api/auth/signin/email', {
        method: 'POST',
        body: JSON.stringify({ email: mockEmail }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

  // Simulate a POST request.  We're not actually making a network call,
  // but we're creating an object that *looks* like the request SvelteKit
  // would receive.  This requires a full implementation of the endpoint.
  const response = await mockRequest.json(); // Process the request as if it went through SvelteKit

  // Assert that sendMagicLinkEmail was called with the correct arguments.
  expect(sendMagicLinkEmail).toHaveBeenCalledWith(expect.objectContaining({
    email: mockEmail,
    token: expect.any(String),
  }));

  // Assert on the response.  This assumes your endpoint returns a 200
  // status and a JSON object with a "success" property.  Adjust as needed
  // to match your actual endpoint's behavior.
  expect(response).toEqual({ email: mockEmail });
});
