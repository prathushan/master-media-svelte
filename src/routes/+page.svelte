<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
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
</script>

<svelte:head>
  <title>{page?.title ?? 'Home'}</title>
</svelte:head>

{#if heroBlock}
  <section
    class="hero-section"
    style="background-image: url('{backgroundImageUrl}')"
    aria-label="Hero Section"
  >
    <div class="hero-content">
      <h1>{heroBlock.title}</h1>
      <p>{heroBlock.subtitle}</p>
    </div>
  </section>
{:else}
  <p class="no-content">No hero section found.</p>
{/if}

<style>
  .hero-section {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .hero-content {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2rem;
    border-radius: 1rem;
    max-width: 700px;
  }

  .hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .hero-content p {
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .no-content {
    padding: 4rem;
    text-align: center;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 1.8rem;
    }

    .hero-content p {
      font-size: 1rem;
    }
  }
</style>
