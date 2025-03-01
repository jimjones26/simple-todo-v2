<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';

  let message: string | null = null;
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
    <h3 class="text-2xl font-bold text-center">Login</h3>
    <form
      action="/api/auth/signin/email"
      method="post"
      use:enhance={() => {
        return async ({ update }) => {
          message = 'Check your email for the magic link!';
          update();
        };
      }}
    >
      <div class="mt-4">
        <label class="block" for="email">Email<label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
        </div>
        <div class="flex items-baseline justify-between">
          <button
            type="submit"
            class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Login
          </button>
        </div>
      </div>
    </form>
    {#if message}
      <p class="mt-4 text-green-600">{message}</p>
    {/if}
  </div>
</div>
