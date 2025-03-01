import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'; // Import the 'path' module

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom', // or 'node', depending on your test needs
    exclude: ['tests/e2e'],
    setupFiles: ['./vitest-setup-client.ts'], // Keep this line
  },
  resolve: {
    alias: { '@routes': path.resolve('./src/routes') } // Add this alias
  }
});
