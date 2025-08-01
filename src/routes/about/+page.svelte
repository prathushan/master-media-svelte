<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { particleConfig } from '$lib/particles'; // or define inline

  onMount(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', particleConfig);
    }
  });
</script>

<style>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .content {
    position: relative;
    z-index: 1;
    padding-top: 10rem;
    color: white;
    text-align: center;
  }


</style>

<div id="particles-js"></div>

<div class="content">
  <!-- <h1>Particles.js using CDN</h1>
  <p>This works cleanly with the script tag.</p> -->
</div>
