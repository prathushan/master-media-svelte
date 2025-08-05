<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  import { onMount } from 'svelte';
  import { particleConfig } from '$lib/particles';

  export let data;

  const page = data.homePage;
  const contentBlocks = page?.content || [];

  const heroBlock = contentBlocks
    .find(block => block._type === 'builderBlock')
    ?.block?.find(b => b._type === 'heroSection');

  const imageWithTextBlocks = contentBlocks
    .filter(block => block._type === 'builderBlock')
    .flatMap(b => b.block)
    .filter(b => b._type === 'imageWithText');

  const testimonialBlock = contentBlocks
    .filter(block => block._type === 'builderBlock')
    .flatMap(b => b.block)
    .find(b => b._type === 'testimonialsSection');

  const illustrationBlock = contentBlocks
  .filter(block => block._type === 'builderBlock')
  .flatMap(b => b.block)
  .find(b => b._type === 'cardSection');


  let backgroundImageUrl = '';
  if (heroBlock?.backgroundImage?.asset?._ref) {
    backgroundImageUrl = urlFor(heroBlock.backgroundImage)
      .width(1600)
      .height(900)
      .auto('format')
      .quality(80)
      .url();
  }

  // Testimonial slider state
  let currentTestimonial = 0;
  let testimonials = testimonialBlock?.testimonials || [];
  let sliderInterval;
  let autorotate = true;
  let autorotateTiming = 2000;
  
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }
  
  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  }
  
  function goToTestimonial(index) {
    currentTestimonial = index;
  }

  function stopAutorotate() {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }

  // Animation triggers
  let animatedElements = [];
  
function handleScroll() {
  const remainingElements = [];

  animatedElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;

    if (isVisible) {
      el.classList.add('animate-in');

      // Remove from array only when animation finishes
      const onAnimationEnd = () => {
        el.removeEventListener('animationend', onAnimationEnd);
        animatedElements = animatedElements.filter(e => e !== el);
      };

      el.addEventListener('animationend', onAnimationEnd);
    } else {
      remainingElements.push(el);
    }
  });

  animatedElements = remainingElements;
}

  onMount(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', particleConfig);
    }
    
    // Initialize scroll animations
    animatedElements = Array.from(document.querySelectorAll('.image-text-section'));
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    // Auto-rotate testimonials
    if (testimonials.length > 1 && autorotate) {
      sliderInterval = setInterval(nextTestimonial, autorotateTiming);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(sliderInterval);
    };
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

{#if illustrationBlock}
  <section class="illustration-section">
    <div class="illustration-grid">
      {#each illustrationBlock.cards as card (card._key)}
        <div class="illustration-card">
          {#if card.title}
            <div class="marquee-container">
              <h3 class="marquee-text">{card.title} •</h3>
              <h3 class="marquee-text" aria-hidden="true">{card.title} •</h3>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>
{/if}



<!-- Modern ImageWithText Section -->
{#if imageWithTextBlocks.length}
  {#each imageWithTextBlocks as block, index (block._key)}
    <section class={`image-text-section ${index % 2 === 1 ? 'reversed' : ''}`} 
             in:fly={{ y: 50, duration: 500, delay: index * 150 }}
             out:fade
             animate:fade>
      <div class="text-column">
        <h5 class="section-label">{index === 1 ? 'Services' : 'About Us'}</h5>
        {#if block.title}
          <h2 class="section-title">{block.title}</h2>
        {/if}
        {#if block.description}
          <div class="section-description">
            {@html block.description.replace(/\n/g, '<br>')}
          </div>
        {/if}
        {#if block.button?.label && block.button?.url}
          <a href={block.button.url} class="modern-button">
            <span>{block.button.label}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        {/if}
      </div>
      <div class="image-column">
        {#if block.mediaType === 'image' && block.image?.asset?._ref}
          <div class="modern-image-wrapper">
            <div class="image-border-accent"></div>
            <img 
              src={urlFor(block.image).width(800).url()} 
              alt={block.title || 'Image'}
              loading="lazy"
            />
            <div class="image-overlay"></div>
          </div>
        {/if}
      </div>
    </section>
  {/each}
{/if}

{#if testimonialBlock}
  <section class="fancy-testimonial-section">
    <div class="fancy-testimonial-container">
     {#if testimonialBlock.mainTitle}
  <h2 class="testimonial-title">{testimonialBlock.mainTitle}</h2>
{/if}
{#if testimonialBlock.mainDescription}
  <p class="testimonial-description">{testimonialBlock.mainDescription}</p>
{/if}
      <div class="fancy-testimonial-slider">
        <!-- Testimonial image -->
        <div class="fancy-slider-image-container">
          <div class="fancy-image-mask">
            {#each testimonials as testimonial, index (testimonial._key)}
              <div class:fancy-active={currentTestimonial === index} class="fancy-testimonial-image">
                {#if testimonial.image?.asset?._ref}
                  <img 
                    src={urlFor(testimonial.image).width(200).url()} 
                    width="56" 
                    height="56" 
                    alt={testimonial.author}
                    loading="lazy"
                    class="fancy-testimonial-img"
                  />
                {/if}
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Text -->
        <div class="fancy-slider-text">
          <div class="fancy-slider-track">
            {#each testimonials as testimonial, index (testimonial._key)}
              <div class:fancy-active={currentTestimonial === index} class="fancy-testimonial-quote">
                <div class="fancy-quote-text"><i>"{testimonial.review}"</i></div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Buttons -->
        <div class="fancy-slider-buttons">
          {#each testimonials as testimonial, index (testimonial._key)}
            <button
              class:fancy-active={currentTestimonial === index}
              class="fancy-slider-button"
              on:click={() => { goToTestimonial(index); stopAutorotate(); }}
            >
              <span>{testimonial.author}</span> 
              <span class:fancy-active={currentTestimonial === index}>-</span> 
              <span>{testimonial.role || 'Client'}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  /* Previous styles remain unchanged */
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
    color: #0d79d3;
    pointer-events: none;
  }

  .hero-content p {
    font-size: 1.4rem;
    margin-bottom: 2rem;
    color: #000000;
  }

  /* Modern ImageWithText Section Styles */
  .image-text-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 8rem auto;
    padding: 0 2rem;
    gap: 4rem;
    opacity: 0;
    margin-top:2rem;
    margin-bottom:2rem;
  }

  .image-text-section.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .image-text-section.reversed {
    flex-direction: row-reverse;
  }

  .text-column {
    flex: 1 1 50%;
    min-width: 300px;
    padding: 2rem;
    position: relative;
  }

  .image-column {
    flex: 1 1 50%;
    min-width: 300px;
    position: relative;
  }

  .section-label {
    color: #0d79d3;
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    position: relative;
    padding-left: 1.5rem;
  }

  .section-label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 2px;
    background: #0d79d3;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #222;
    line-height: 1.2;
    background: linear-gradient(90deg, #0d79d3, #0a5da0);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    max-width: 80%;
  }

  .section-description {
    color: #555;
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    line-height: 1.8;
    max-width: 90%;
  }

  .modern-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 2rem;
    background: linear-gradient(135deg, #0d79d3 0%, #0a5da0 100%);
    color: white;
    font-weight: 600;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(13, 121, 211, 0.2);
    border: none;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .modern-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a5da0 0%, #0d79d3 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .modern-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(13, 121, 211, 0.3);
  }

  .modern-button:hover:before {
    opacity: 1;
  }

  .modern-button svg {
    transition: transform 0.3s ease;
  }

  .modern-button:hover svg {
    transform: translateX(4px);
  }

  .modern-image-wrapper {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }

  .modern-image-wrapper:hover {
    transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) scale(1.02);
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.2);
  }

  .modern-image-wrapper img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
    border-radius: 12px;
  }

  .image-border-accent {
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(135deg, #0d79d3, #0a5da0);
    z-index: -1;
    border-radius: 16px;
    opacity: 0.7;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(13, 121, 211, 0.1) 0%, rgba(10, 93, 160, 0.1) 100%);
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  /* New Fancy Testimonial Slider Styles */
  .fancy-testimonial-section {
    position: relative;
    padding: 2rem 2rem;
    background-color: #f8fafc;
  }

  .fancy-testimonial-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  .testimonial-title{
   color:#0d79d3;
   font-size:2.5rem;
   margin-bottom:0;
  }

  .fancy-testimonial-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #0d79d3;
    position: relative;
    display: inline-block;
    font-weight: 700;
  }

  .fancy-testimonial-title:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #0d79d3, #0d79d3);
    border-radius: 3px;
  }

  .fancy-testimonial-description {
    color: #64748b;
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }

  .fancy-testimonial-slider {
    max-width: 800px;
    margin: 0 auto;
  }

  .fancy-slider-image-container {
    position: relative;
    height: 8rem;
    margin-bottom: 2rem;
    margin-top:8%;
  }

  .fancy-image-mask {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width:680px;
    height: 680px;
    pointer-events: none;
  }

  .fancy-image-mask:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, #0d7ad35e, #0d7ad318 25%, rgba(99, 102, 241, 0) 0%);
    border-radius: 50%;
    z-index: -10;
  }

  .fancy-testimonial-image {
    position: absolute;
    inset: 0;
    z-index: -10;
    opacity: 0;
    transform: rotate(-60deg);
    transition: all 0.7s cubic-bezier(0.68, -0.3, 0.32, 1);
    
  }

  .fancy-testimonial-image.fancy-active {
    opacity: 1;
    transform: rotate(0);
  }

  .fancy-testimonial-img {
    position: relative;
    top: 2.75rem;
    left: 8%;
    transform: translateX(-50%);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .fancy-slider-text {
    margin-bottom: 2.25rem;
  }

  .fancy-slider-track {
    position: relative;
    transition: height 0.3s ease;
  }
  
  .fancy-testimonial-quote {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    transform: translateX(-1rem);
    transition: all 0.5s ease-in-out;
  }

  .fancy-testimonial-quote.fancy-active {
    position: relative;
    opacity: 1;
    transform: translateX(0);
  }

  .fancy-quote-text {
    font-size: 1.3rem;
    color: #1e293b;
    
  }

  .fancy-slider-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -0.375rem;
  margin-bottom: 5%;
}

.fancy-slider-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border-radius: 9999px;
  padding: 0.8rem 1.2rem;
  margin: 0.375rem;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f0f0f3;
  color: #0d79d3;
  box-shadow: 6px 6px 12px #c8c8cc, -6px -6px 12px #ffffff;
}

.fancy-slider-button:hover {
  box-shadow: inset 2px 2px 6px #d1d9e6, inset -2px -2px 6px #ffffff;
  background-color: #f0f0f3;
}

.fancy-slider-button.fancy-active {
  background: #0d79d3;
  color: white;
  box-shadow: inset 4px 4px 8px #0a5fa6, inset -4px -4px 8px #1294ff;
}

.fancy-slider-button span {
  transition: color 0.15s ease;
}

.fancy-slider-button span.fancy-active {
  color: #d6e0ff;
}


  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .image-text-section {
      gap: 2rem;
      margin: 5rem auto;
    }
    
    .section-title {
      font-size: 2.2rem;
      max-width: 100%;
    }
    
    .section-description {
      max-width: 100%;
    }
    .hero-content h1{
      font-size:3rem;
    }
    .hero-content p{
      font-size:1.25rem;
    }
    .hero-section{
      height:80vh;
    }
    .testimonial-title{
      font-size:1.8rem;
    }
    .fancy-testimonial-img{
      left:18%;
    }
  }

  @media (max-width: 768px) {
    .image-text-section {
      flex-direction: column;
      text-align: center;
      padding: 0 1.5rem;
      margin: 2rem auto;

    }
    
    .image-text-section.reversed {
      flex-direction: column;
    }
    
    .text-column {
      padding: 1rem 0;
    }
    
    .section-label {
      padding-left: 0;
      margin-left: auto;
      margin-right: auto;
    }
    
    .section-label:before {
      display: none;
    }
    
    .section-title {
      font-size: 2rem;
      margin-left: auto;
      margin-right: auto;
    }
    
    .modern-button {
      margin: 0 auto;
    }
 
    .modern-image-wrapper {
      max-width: 100%;
    }

    .fancy-testimonial-section {
      padding: 1rem 1.5rem;
    }

    .fancy-testimonial-title {
      font-size: 2rem;
    }

    .fancy-quote-text {
      font-size: 1.25rem;
    }

    .fancy-image-mask {
      width: 360px;
      height: 360px;
    }
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: 1.8rem;
    }
    
    .section-description {
      font-size: 1rem;
    }
    
    .modern-button {
      padding: 0.75rem 1.5rem;
    }

    .fancy-testimonial-title {
      font-size: 1.8rem;
    }

    .fancy-testimonial-description {
      font-size: 1rem;
    }

    .fancy-quote-text {
      font-size: 1.1rem;
    }

    .fancy-image-mask {
      width: 280px;
      height: 280px;
    }
  }

   .illustration-section {
    /* Your existing section styles */
    overflow: hidden;
  }

 .marquee-container {
    height: 100px;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    margin-top: 2%;
    position: relative;
    background: #0d79d3;
  }

  .marquee-content {
    display: flex;
    width: max-content;
  }

  .marquee-text {
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 5em;
    font-weight: bold;
    padding: 0 20px;
    display: flex;
    align-items: center;
    color: #ffffff;
    animation: text-scroll 20s linear infinite;
    flex-shrink: 0;
  }

  @keyframes text-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* Pause animation on hover */
  .marquee-container:hover .marquee-text {
    animation-play-state: paused;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .marquee-text {
      font-size: 2em;
    }
  }

  @media (max-width: 480px) {
    .marquee-text {
      font-size: 1.5em;
    }
    .marquee-container {
      height: 70px;
    }
  }
</style>

