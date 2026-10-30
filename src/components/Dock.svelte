<script>
  import { CONFIG } from '../config.js';
  import { hello, smsHref, telHref } from '../lib/contact.js';
  import Icon from './Icon.svelte';

  // Compact call/text bar pinned to the bottom of the screen on phones.
  let { visible = false } = $props();
  const { owner } = CONFIG;
</script>

<nav class="dock" class:is-visible={visible} aria-label="Contact {owner.name}" inert={!visible}>
  <a class="dock__call" href={telHref(owner.phone)}><Icon name="phone" /><span>Call</span></a>
  <a class="dock__text" href={smsHref(owner.phone, hello())}><Icon name="message" /><span>Text</span></a>
</nav>
