<script lang="ts">
  import { urlFor } from "$lib/utils/image-builder";
  import Particles from "$lib/components/Particles.svelte";
  export let data;

  const page = data.aboutPage;
</script>

<svelte:head>
  <title>{page?.title ?? "About"}</title>
</svelte:head>

{#if page?.content}
  {#each page.content as section (section._key)}
    {#each section.block as block (block._key)}
      {#if block._type === "heroSection"}
        <Particles title={block.title} subtitle={""} />
      {:else if block._type === "imageWithText"}
        <section class="image-text">
          <div class="image-text-container">
            <div class="image-col">
              <img
                src={urlFor(block.image).width(800).url()}
                alt={block.title}
              />
            </div>
            <div class="text-col">
              <div>
                <h2>{block.title}</h2>
                <p>{block.description}</p>
              </div>
              <div>
                {#if block.button}
                  <button>{block.button.label}</button>
                {/if}
              </div>
            </div>
          </div>
        </section>
      {:else if block._type === "textBlock"}
        {#each block.text as textBlock}
          {#if textBlock.style === "h2"}
            <h2 class="section-heading">{textBlock.children[0].text}</h2>
          {:else if textBlock.style === "normal"}
            <p class="section-description">{textBlock.children[0].text}</p>
          {/if}
        {/each}
      {:else if block._type === "buttonBlock"}
        <div class="section-button">
          <!-- <button>{block.text}</button> -->
        </div>
      {:else if block._type === "cardSection"}
        <section class="team-section">
          <!-- <h2 class="team-title">{block.sectionTitle}</h2> -->
          <div class="team-grid">
            {#each block.cards as member (member._key)}
              <div class="team-card">
                <div class="team-image-wrapper">
                  <img
                    src={urlFor(member.image).width(500).url()}
                    alt={member.title}
                  />
                </div>
                <h3>{member.title}</h3>
                <p>{member.paragraph}</p>
              </div>
            {/each}
          </div>
        </section>
      {/if}
    {/each}
  {/each}
{:else}
  <p>Loading content...</p>
{/if}

<style>
  .hero {
    height: 75vh;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  /* .hero-content {
    background: rgba(0, 0, 0, 0.5);
    padding: 2rem 3rem;
    border-radius: 10px;
  } */

  .hero-content h1 {
    font-size: 4rem;
    /* color:#0d79d3; */
  }

  .image-text {
    padding: 4rem 2rem;
  }

  .image-text-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    /* align-items: center; */
  }

  .image-col {
    flex: 1 1 45%;
  }

  .image-col img {
    max-width: 100%;
    display: block;
    border-radius: 8px;
  }

  .text-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 45%;
    padding: 1rem 0;
  }

  .text-col h2 {
    color: #0d79d3;
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .text-col p {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .text-col button {
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border: none;
    background-color: #0d79d3;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }

  .section-heading {
    color: #0d79d3;
    font-size: 2rem;
    margin: 1rem 0 1rem;
    text-align: center;
  }

  .section-description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 2rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .section-button {
    text-align: center;
    margin: 2rem 0;
  }

  .section-button button {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    background-color: #0d79d3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .team-section {
    padding: 2rem;
  }

  .team-title {
    color: #0d79d3;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .team-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: center;
  }

  .team-card {
    text-align: center;
    max-width: 280px;
  }

  .team-image-wrapper {
    overflow: hidden;
    border-radius: 10px;
    filter: grayscale(100%);
    transition: filter 0.5s ease;
  }

  .team-image-wrapper img {
    max-width: 100%;
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: top;
  }

  .team-card:hover .team-image-wrapper {
    filter: grayscale(0%);
  }

  .team-card h3 {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  .team-card p {
    font-size: 1rem;
    color: #666;
  }

  @media (max-width: 768px) {
    .image-text-container {
      flex-direction: column;
    }

    .hero-content h1 {
      font-size: 1.8rem;
    }

    .text-col h2 {
      font-size: 1.5rem;
    }
  }
</style>
