<script>
  import { CONFIG } from '../config.js';
</script>

<section class="notes-section" aria-labelledby="notes-title">
  <h2 id="notes-title" class="section__title">Good to know</h2>
  <ul class="notes">
    {#each CONFIG.notes as note (note.lead)}
      <li class="notes__item"><strong>{note.lead}</strong> {note.text}</li>
    {/each}
  </ul>
</section>
