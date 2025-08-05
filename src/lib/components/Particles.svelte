<script lang="ts">
  import { onMount } from 'svelte';
  import { particleConfig } from '$lib/particles';

  export let id = 'particles-js';
  export let title: string = 'Master Media';
  export let subtitle: string = '';

  onMount(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS(id, particleConfig);
    } else {
      console.warn('particlesJS is not available');
    }
  });
</script>

<style>
  .hero-section {
    position: relative;
    min-height: 70vh;
    overflow: hidden;
    cursor:move;

  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
    color: #0d79d3;
    pointer-events: none; /* Allow canvas to receive hover */
  }

  h1, p {
    margin:0;
    pointer-events: none; /* Let user interact with text if needed */
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color:#555;
  }
</style>

<section class="hero-section" aria-label="Hero Section">
  <div id={id}></div>
  <div class="hero-content">
    <h1>{title}</h1>
    {#if subtitle}
      <p>{subtitle}</p>
    {/if}
  </div>
</section>
