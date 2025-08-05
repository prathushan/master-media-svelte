<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  export let data;

  const page = data.servicesPage;
</script>

<svelte:head>
  <title>{page?.title ?? 'Services'}</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
</svelte:head>

{#if page?.content}
  {#each page.content as section}
    {#if section.label === "Banner"}
      {#each section.block as block}
        {#if block._type === "heroSection"}
          <section
            class="hero"
            style="background-image: url('{urlFor(block.backgroundImage.asset._ref)}');"
          >
            <div class="hero-content">
              <h1>{block.title}</h1>
              <p>{block.subtitle}</p>
            </div>
          </section>
        {/if}
      {/each}
    {/if}
  {/each}

  {#each page.content as section}
    {#if section.label === "Work cards "}
      {#each section.block as block}
        {#if block._type === "cardSection"}
          <section class="card-section">
            <h2>{block.sectionTitle}</h2>
            <div class="card-grid">
              {#each block.cards as card, index}
                <div class="card" style="--clr:
                  {index === 0 ? '#d3b19a' :
                   index === 1 ? '#70b3b1' :
                   index === 2 ? '#d05fa2' : 
                   index === 3 ? '#d3b19a' :
                   index === 4 ? '#70b3b1' :
                   index === 5 ? '#d05fa2' :'#000'}">
                  <div class="card-inner">
                    <div class="box">
                      <div class="imgBox">
                        {#if card.image?.asset?._ref}
                          <img 
                            src="{urlFor(card.image.asset).width(400).url()}" 
                            alt="{card.title}"
                            loading="lazy"
                            width="400"
                            height="300"
                          />
                        {/if}
                      </div>
                      <div class="icon">
                        <a class="iconBox">
                          <span class="material-symbols-outlined">arrow_outward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="content">
                    <h3>{card.title}</h3>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/if}
      {/each}
    {/if}
  {/each}
{/if}

<style>
  :global(body) {
    font-family: "Lato", sans-serif;
    background: #fff;
    margin: 0;
    color: #111;
  }

  .hero {
    padding: 4rem 2rem;
    color: white;
    text-align: center;
    background-size: cover;
    background-position: center;
  }

  .hero-content h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
  }

  .hero-content p {
    font-size: 1.25rem;
  }

  .card-section {
    padding: 4rem 2rem;
    max-width: 1300px;
    margin: auto;
  }

  .card-section h2 {
    text-align: center;
    font-size: clamp(2rem, 1.8rem + 1vw, 2.5rem);
    margin-bottom: 3rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 300px;
    background: var(--clr);
    border-radius: 1.25rem;
    border-bottom-right-radius: 0;
    overflow: hidden;
  }

  .box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 1.25rem;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    /* Neomorphism effect */
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.1),
                -8px -8px 15px rgba(255, 255, 255, 0.8);
    transition: box-shadow 0.3s ease;
  }

  .box:hover {
    box-shadow: 12px 12px 20px rgba(0, 0, 0, 0.1),
               -12px -12px 20px rgba(255, 255, 255, 0.8);
  }

  .imgBox {
    position: absolute;
    inset: 0;
  }

  .imgBox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .imgBox:hover img {
    transform: scale(1.03);
  }

  .icon {
    position: absolute;
    bottom: -0.375rem;
    right: -0.375rem;
    width: 6rem;
    height: 6rem;
    background: white;
    border-top-left-radius: 50%;
    text-decoration: none !important;
  }

  .iconBox {
    position: absolute;
    inset: 0.625rem;
    background: var(--clr);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .iconBox:hover {
    transform: scale(1.1);
  }

  .iconBox span {
    color: #fff;
    font-size: 1.5rem;
  }

  .content {
    padding: 1rem 0.5rem;
  }

  .content h3 {
    text-transform: capitalize;
    font-size: clamp(1.4rem, 1.2rem + 0.5vw, 1.8rem);
    font-weight: 700;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: repeat(1, 1fr);
    }

    .card-inner {
      height: 240px;
    }

    .icon {
      width: 4rem;
      height: 4rem;
    }

    .iconBox span {
      font-size: 1.25rem;
    }
  }
</style>