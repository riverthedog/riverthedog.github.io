<script>
  import { onMount } from 'svelte';
  import { CONFIG } from '../config.js';
  import { slidesFor } from '../photos.js';
  import { scrolledPast } from '../lib/actions.js';
  import { setThemeColor } from '../lib/theme.js';
  import Actions from '../components/Actions.svelte';
  import CareNotes from '../components/CareNotes.svelte';
  import Contacts from '../components/Contacts.svelte';
  import Carousel from '../components/Carousel.svelte';
  import Thanks from '../components/Thanks.svelte';
  import Dock from '../components/Dock.svelte';
  import photo from '../assets/hero/wet-portrait.webp';
  import cutout from '../assets/hero/wet-portrait-cut.webp';
  import photoWide from '../assets/hero/wet-wide.webp';
  import cutoutWide from '../assets/hero/wet-wide-cut.webp';
  import './page.css';

  // Golden hour: the beach photo fills the header, and River's name sits between the photo
  // and a cutout of River, so it reads as tucked behind her.
  const WIDE = '(min-width: 900px)';
  const { dog, owner } = CONFIG;
  const gallery = slidesFor(CONFIG.gallery);
  let dockVisible = $state(false);

  onMount(() => setThemeColor('#120D09'));
</script>

<div class="golden">
  <header class="hero">
    <div class="hero__stage">
      <picture>
        <source media={WIDE} srcset={photoWide} />
        <img class="hero__photo" src={photo} alt="{dog.name} at the beach, soaking wet with tongue out" />
      </picture>
      <div class="hero__shade"></div>
      <h1 class="hero__name">{dog.name}</h1>
      <picture>
        <source media={WIDE} srcset={cutoutWide} />
        <img class="hero__cutout" src={cutout} alt="" />
      </picture>
      <div class="hero__light"></div>
      <div class="hero__grain"></div>
    </div>

    <div class="hero__panel">
      <p class="hero__intro">
        If you found me on my own, I'm probably lost. Please call or text {owner.name} so they can come get me.
      </p>
      <div use:scrolledPast={(past) => (dockVisible = past)}>
        <Actions showNumber />
      </div>
    </div>
  </header>

  <main class="content">
    <CareNotes />
    <Contacts />
    <Carousel slides={gallery} label="Photos of {dog.name}" />
    <Thanks />
  </main>

  <Dock visible={dockVisible} />
</div>
