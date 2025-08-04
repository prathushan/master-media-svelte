<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  import { onMount } from 'svelte';
  import { particleConfig } from '$lib/particles'; // or define inline

  export let data;

  const page = data.homePage;
  const contentBlocks = page?.content || [];

  const heroBlock = contentBlocks
    .find(block => block._type === 'builderBlock')
    ?.block?.find(b => b._type === 'heroSection');

  let backgroundImageUrl = '';
  if (heroBlock?.backgroundImage?.asset?._ref) {
    backgroundImageUrl = urlFor(heroBlock.backgroundImage)
      .width(1600)
      .height(900)
      .auto('format')
      .quality(80)
      .url();
  }

  onMount(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', particleConfig);
    }
  });
</script>

<svelte:head>
  <title>{page?.title ?? 'Home'}</title>
</svelte:head>

{#if heroBlock}
  <section class="hero-section" aria-label="Hero Section">
    <div id="particles-js"></div>
    <div class="hero-content">
      <h1>{heroBlock.title}</h1>
      <p>{heroBlock.subtitle}</p>
    </div>
  </section>
{:else}
  <section class="hero-section" aria-label="Hero Section">
    <div id="particles-js"></div>
    <div class="hero-content">
      <h1>Master Media</h1>
    </div>
  </section>
{/if}

<style>
  .hero-section {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    
  }

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    top: 0;
    left: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-content h1 {
    font-size: 6rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    color:#0d79d3;
    pointer-events:none;
  }

  .hero-content p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color:#000000;
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2.5rem;
    }
    
    .hero-content p {
      font-size: 1.2rem;
    }
  }
</style>