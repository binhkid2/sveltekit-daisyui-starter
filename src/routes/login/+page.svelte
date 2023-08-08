<script lang="ts">
   import { applyAction, enhance } from '$app/forms'
  import { pb } from '$lib/pocketbase'
    import type { PageData, ActionData } from './$types';
    export let form: ActionData;
</script>
<form
		method="POST"
		action="?/login"
		use:enhance={() => {
            return async ({ result }) => {
              pb.authStore.loadFromCookie(document.cookie)
              await applyAction(result)
            }
          }}
	>
    <h1 class="text-2xl mb-8">Log in</h1>
    <h2 class="text-xl mb-8">Remember verify your email before login.</h2>
    <div class="form-control gap-2 mb-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        class="input input-bordered"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="input input-bordered"
      />
      <button class="btn btn-primary">Log in</button>
      
    </div>
    {#if form?.notVerified}
			You must verify your email before you can login.
			
		{/if}
	</form>
