<script>
  // Tiny inline icon set (Feather-style strokes), so no icon library is needed.
  let { name, class: className = '' } = $props();
  const heavy = name === 'check' || name === 'alert';
</script>

{#if name === 'heart'}
  <svg class={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
{:else}
  <svg
    class={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={heavy ? 3 : 2}
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    {#if name === 'phone'}
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    {:else if name === 'message'}
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    {:else if name === 'chat'}
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    {:else if name === 'pin'}
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    {:else if name === 'check'}
      <polyline points="20 6 9 17 4 12" />
    {:else if name === 'alert'}
      <line x1="12" y1="7" x2="12" y2="13" />
      <line x1="12" y1="17.5" x2="12" y2="17.5" />
    {:else if name === 'spinner'}
      <path d="M12 3a9 9 0 1 0 9 9" />
    {:else if name === 'close'}
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    {:else if name === 'up'}
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    {/if}
  </svg>
{/if}
