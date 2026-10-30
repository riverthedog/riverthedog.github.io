<script>
  import './carousel.css';

  // A plain swipeable photo strip with dots. slides: [{ src, alt }]
  let { slides, label = 'Photos', width = 960, height = 1200, class: className = '' } = $props();
  let track;
  let active = $state(0);

  // The active dot follows whichever slide is closest to the middle of the strip.
  function onScroll() {
    const middle = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    [...track.children].forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
      if (distance < best) [best, closest] = [distance, i];
    });
    active = closest;
  }

  function go(i) {
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: track.children[i].offsetLeft - pad, behavior: 'smooth' });
  }
</script>

<section class="carousel {className}" aria-roledescription="carousel" aria-label={label}>
  <div class="carousel__track" bind:this={track} onscroll={onScroll}>
    {#each slides as slide (slide.src)}
      <img class="carousel__slide" src={slide.src} alt={slide.alt} {width} {height} loading="lazy" draggable="false" />
    {/each}
  </div>
  <div class="carousel__dots">
    {#each slides as slide, i (slide.src)}
      <button type="button" class="carousel__dot" class:is-active={i === active} aria-label="Photo {i + 1} of {slides.length}" aria-current={i === active} onclick={() => go(i)}></button>
    {/each}
  </div>
</section>
