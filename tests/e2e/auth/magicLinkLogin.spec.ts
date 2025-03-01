import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

test('magic link login flow', async ({ page }) => {
  const testEmail = 'test@example.com';

  // 1. Navigate to the login page.
  await page.goto('/login');

  // 2. Fill in the email input and submit the form.
  await page.fill('input[name="email"]', testEmail);
  await page.click('button[type="submit"]');

  // 3. Assert that the success message is displayed.
  await expect(page.locator('text=Check your email for the magic link!')).toBeVisible();

  // 4. Read the token from the file.
  const tokenFilePath = path.join(process.cwd(), 'tmp', 'magicLinkToken.txt');
  const token = await fs.readFile(tokenFilePath, 'utf-8');

  // 5. Construct the callback URL.
  const callbackURL = `/api/auth/callback/email?email=${testEmail}&token=${token}`;

  // 6. Navigate to the callback URL.
  await page.goto(callbackURL);

  // 7. Assert that we are redirected to /tasks.
  await expect(page).toHaveURL('/tasks');

    // 8. Repeat steps to test existing user
    await page.goto('/login');

    // 9. Fill in the email input and submit the form.
    await page.fill('input[name="email"]', testEmail);
    await page.click('button[type="submit"]');

    // 10. Assert that the success message is displayed.
    await expect(page.locator('text=Check your email for the magic link!')).toBeVisible();

    // 11. Read the token from the file.
    const tokenFilePathExisting = path.join(process.cwd(), 'tmp', 'magicLinkToken.txt');
    const tokenExisting = await fs.readFile(tokenFilePathExisting, 'utf-8');

    // 12. Construct the callback URL.
    const callbackURLExisting = `/api/auth/callback/email?email=${testEmail}&token=${tokenExisting}`;

    // 13. Navigate to the callback URL.
    await page.goto(callbackURLExisting);

    // 14. Assert that we are redirected to /tasks.
    await expect(page).toHaveURL('/tasks');
});
