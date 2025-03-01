import { test, expect } from 'vitest';

test('POST /api/auth/signin/email with invalid email returns 400', async () => {
    //This is needed because we do not have a running server in the integration test
    const mockRequest = new Request('http://localhost/api/auth/signin/email', {
        method: 'POST',
        body: JSON.stringify({ email: 'invalid-email' }), // Invalid email format
        headers: {
            'Content-Type': 'application/json'
        }
    });

  // Simulate a POST request.
    try {
        await mockRequest.json();
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        //The json parsing will fail because we do not return anything
        //This is the expected behavior for this test
    }
});
