<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  export let data;
  const post = data.post;
</script>

<article class="blog-post">
  <h1>{post.title}</h1>
  {#if post.mainImage}
    <img src={urlFor(post.mainImage).width(800).url()} alt={post.title} />
  {/if}
  <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
  
  <div class="content">
    {#each post.body as block}
      <p>{block.children?.[0]?.text}</p>
    {/each}
  </div>
</article>


<style>
  .blog-post {
    max-width: 800px;
    margin: 5rem auto;
    padding: 2rem;
  }

  .post-title {
    font-size: 2.5rem;
    color: #0d79d3;
    margin-bottom: 0.5rem;
  }

  .post-date {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 2rem;
  }

  .post-image {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    border-radius: 1rem;
  }

  .post-content :global(p) {
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: #333;
  }

  .post-content :global(h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #0d79d3;
  }

  .post-content :global(a) {
    color: #0d79d3;
    text-decoration: underline;
  }
</style>
