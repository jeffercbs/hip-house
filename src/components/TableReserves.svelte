<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { deleteReserver } from "@/utils/reservers";

  const reserves = writable<any[]>([]);

  onMount(async () => {
    const res = await fetch("http://localhost:4321/api/reserves", {
      method: "GET",
      headers: {
        "Cache-Control": "max-age=3600",
      },
    });
    const data: any[] = await res.json();
    reserves.set(data.reverse());
  });
</script>

<div class="relative overflow-x-auto">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead class="table-head">
      <tr>
        <th scope="col" class="px-6 py-3"> fecha</th>
        <th scope="col" class="px-6 py-3"> cliente</th>
        <th scope="col" class="px-6 py-3"> estado</th>
        <th scope="col" class="px-6 py-3"> acciones</th>
      </tr>
    </thead>
    <tbody>
      {#if $reserves.length > 0}
        {#each $reserves as { visitor_name, visitor_dni, visitor_email, reserve_date, reserve_time, reserve_status: status, reserve_id }}
          <tr class="border-b hover:bg-white/20">
            <td class="px-2 py-4">
              <span class="flex flex-col">
                <time datetime={reserve_date}>
                  FECHA: <strong>{reserve_date}</strong>
                </time>
                <span>HORA: <strong>{reserve_time}</strong></span>
              </span>
            </td>

            <th scope="row" class="flex flex-col px-6 py-4 whitespace-nowrap">
              <strong>{visitor_name}</strong>
              <span class="opacity-80">{visitor_email}</span>
              <span>
                CC: <strong>{visitor_dni}</strong>
              </span>
            </th>

            <td class="px-6 py-4">
              <span
                class:cancel={status === "cancelled"}
                class:active={status === "active"}
                class=" text-xs status"
              >
                {status === "active" ? "Activa" : "Cancelada"}
              </span>
            </td>
            <td class="px-6 py-4">
              <form>
                <button
                  aria-label="Eliminar reserva"
                  type="submit"
                  on:click={async () => await deleteReserver(reserve_id)}
                  class="table-action bg-red-700 hover:bg-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span class="sr-only">Eliminar</span>
                </button>
              </form>
            </td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="px-6 py-4" colspan="4">
            <div class="flex items-center justify-center">
              <span class="text-gray-400">No hay reservas</span>
            </div>
          </td>
        </tr>{/if}
    </tbody>
  </table>
</div>

<style>
  .table-head {
    @apply text-xs text-gray-700 uppercase bg-stone-100 border-y-2 border-stone-300;
  }
  .table-action {
    @apply font-medium text-white rounded-full text-sm p-2.5 text-center inline-flex items-center me-2;
  }
  .table-action:focus {
    @apply ring-4 outline-none ring-red-300;
  }
  .status {
    @apply font-medium me-2 px-2.5 py-0.5 rounded-full;
  }
  .active {
    @apply bg-green-100 text-green-800;
  }
  .cancel {
    @apply bg-red-100 text-red-800;
  }
</style>
