<script lang="ts">
  import { writable } from 'svelte/store';

  export let session: any = null;
  export let classes: string = '';

  let errorMessage: string | null = null;
  let successMessage: string | null = null;
  const disabled = writable(true);

  async function submit(event: SubmitEvent) {
    event.preventDefault();

    const data = new FormData(event.currentTarget as HTMLFormElement);
    const res = await fetch(`/api/reserves`, {
      method: 'POST',
      body: data,
    });

    const json = await res.json();
    if (res.ok) {
      successMessage = json.message;
    } else {
      errorMessage = json.error;
    }
  }

  $: session !== null && disabled.set(false);
  $: {
    if (successMessage !== null || errorMessage !== null) {
      setTimeout(() => {
        successMessage = null;
        errorMessage = null;

        window.location.reload();
      }, 3000);
    }
  }
</script>

<form on:submit={submit} class={`form md:px-8 px-6 ${classes}`}>
  <slot />
  <button
    type="submit"
    disabled={$disabled}
    class:disabled={$disabled}
    class:active={!$disabled}
    class="btn-submit"
  >
    Reservar ahora mismo
  </button>

  {#if successMessage !== null}
    <div
      class="p-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50"
      role="alert"
    >
      <span class="font-medium">!Info! </span>{successMessage}.
    </div>
  {/if}
  {#if errorMessage !== null}
    <div
      class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      <span class="font-medium">!Error¡ </span>{errorMessage}
    </div>
  {/if}
</form>

<style>
  .form {
    @apply py-12 border-2 rounded-lg;
  }
  .btn-submit {
    @apply w-full py-3 rounded-lg transition-colors ease-in-out border-2 border-primary bg-orange-200 text-primary mt-4;
  }
  .disabled:disabled {
    @apply opacity-50;
  }
  .active:hover {
    @apply bg-primary text-orange-100 shadow-2xl shadow-orange-500/30;
  }
</style>
