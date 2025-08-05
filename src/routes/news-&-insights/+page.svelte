<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  export let data;
  const posts = data.posts;
</script>

<section class="blog-section">
  <h1 class="section-title">Blog</h1>
  <div class="blog-grid">
    {#each posts as post}
      <a class="blog-card" href={`/news-&-insights/${post.slug.current}`}>
        {#if post.mainImage}
          <div class="card-image-container">
            <img
              class="card-image"
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={post.title}
              loading="lazy"
            />
          </div>
        {/if}
        <div class="card-content">
          <span class="card-badge">Blog</span>
          <h2 class="card-title">{post.title}</h2>
          <p class="card-date">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <span class="card-action">Read More</span>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  :global(body) {
    font-family: 'Lato', sans-serif;
    background: #fff;
    margin: 0;
    color: #333;
    line-height: 1.6;
  }

  .blog-section {
    padding: 3rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 2.5rem;
    text-align: center;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .blog-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    border: 1px solid #eaeaea;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .blog-card:hover {
    border-color: #0070f3;
    box-shadow: 0 5px 15px rgba(0, 112, 243, 0.1);
    transform: translateY(-3px);
  }

  .card-image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .blog-card:hover .card-image {
    transform: scale(1.05);
  }

  .card-content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .card-badge {
    display: inline-block;
    background: #f5f5f5;
    color: #0070f3;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    align-self: flex-start;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: #222;
    line-height: 1.4;
  }

  .card-date {
    display: block;
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .card-action {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0070f3;
    display: inline-flex;
    align-items: center;
    margin-top: auto;
    transition: transform 0.2s ease;
  }

  .blog-card:hover .card-action {
    transform: translateX(3px);
  }

  .card-action::after {
    content: '→';
    margin-left: 0.25rem;
    transition: margin-left 0.2s ease;
  }

  .blog-card:hover .card-action::after {
    margin-left: 0.5rem;
  }

  @media (max-width: 768px) {
    .blog-section {
      padding: 2rem 1rem;
    }

    .blog-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .card-image-container {
      height: 180px;
    }
  }

  @media (max-width: 480px) {
    .card-image-container {
      height: 160px;
    }
    
    .card-content {
      padding: 1.25rem;
    }
  }
</style>