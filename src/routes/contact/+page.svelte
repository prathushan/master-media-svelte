<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  export let data;

  const page = data.contactPage;
  //  let mapIframeHtml = '';
  
  // Form state
  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let isSubmitting = false;
  let submitSuccess = false;
  let submitError = '';

  // FAQ state
  let activeFaqIndex: number | null = null;

  const toggleFaq = (index: number) => {
    activeFaqIndex = activeFaqIndex === index ? null : index;
  };

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      submitError = 'Please fill in all required fields';
      return;
    }

    isSubmitting = true;
    submitError = '';

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        }),
      });

      if (response.ok) {
        submitSuccess = true;
        name = '';
        email = '';
        phone = '';
        message = '';
      } else {
        const errorData = await response.json();
        submitError = errorData.message || 'Failed to submit form';
      }
    } catch (err) {
      submitError = 'Network error. Please try again.';
    } finally {
      isSubmitting = false;
    }
  };

    let mapIframeSrc = '';
  
  $: if (page?.content) {
    for (const section of page.content) {
      for (const block of section.block) {
        if (block._type === 'textBlock' && block.text?.[0]?.children?.[0]?.text?.includes('<iframe')) {
          const iframeHtml = block.text[0].children[0].text;
          const srcMatch = iframeHtml.match(/src="([^"]*)"/);
          if (srcMatch && srcMatch[1]) {
            mapIframeSrc = srcMatch[1];
          }
          break;
        }
      }
    }
  }
</script>


<svelte:head>
  <title>{page?.title ?? 'Contact'}</title>
</svelte:head>

{#if page?.content}
  {#each page.content as section (section._key)}
    {#each section.block as block (block._key)}
      {#if block._type === 'heroSection'}
        <section class="hero" style="background-image: url('{urlFor(block.backgroundImage).width(1600).height(900).auto('format').quality(80).url()}')">
          <div class="hero-content">
            <h1>{block.title}</h1>
          </div>
        </section>
      {:else if block._type === 'faqSection'}
        <!-- FAQ section will be rendered in the combined section below -->
      {/if}
    {/each}
  {/each}
{:else}
  <p>Loading content...</p>
{/if}

<div class="contact-form-bg">
        <div class="contact-form-wrapper">
        <h2>Get in Touch</h2>
        {#if submitSuccess}
          <div class="success-message">
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        {:else}
          <form class="contact-form" on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
              <input
                type="text"
                id="name"
                bind:value={name}
                required
              />
              <label for="name">Name *</label>
              <div class="border-line"></div>
            </div>

             <div class="form-group">
              <input
                type="text"
                id="phone"
                bind:value={phone}
                required
              />
              <label for="phone">Phone *</label>
              <div class="border-line"></div>
            </div>

            <div class="form-group">
              <input
                type="email"
                id="email"
                bind:value={email}
                required
              />
              <label for="email">Email *</label>
              <div class="border-line"></div>
            </div>

           

            <div class="form-group textarea-group">
              <textarea
                id="message"
                bind:value={message}
                required
              ></textarea>
              <label for="message">Message *</label>
              <div class="border-line"></div>
            </div>

            {#if submitError}
              <div class="error-message">{submitError}</div>
            {/if}

            <button type="submit" class="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        {/if}
      </div>
</div>


<!-- Contact Form Section -->
<section class="contact-section">
  <div class="container">
    <div class="contact-grid">
      <!-- Contact Form -->


      <!-- Map and FAQ Section -->
      <div class="map-faq-wrapper">
        <!-- Map -->
<div class="map-container">
  <h3>Our Location</h3>
  <div class="map-embed">
    {#if mapIframeSrc}
      <iframe
        src={mapIframeSrc}
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    {:else}
      <!-- Fallback if no iframe found -->
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018898!2d-73.98784492426788!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    {/if}
  </div>
  <div class="map-overlay"></div>
  <div class="contact-info">
    <p><strong>Address:</strong> 123 Main Street, New York, NY 10001</p>
    <p><strong>Email:</strong> info@mastermedia1.com</p>
    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
  </div>
</div>

        <!-- FAQ -->
        {#each page.content as section (section._key)}
          {#each section.block as block (block._key)}
            {#if block._type === 'faqSection'}
              <div class="faq-container">
                <h3>{block.title}</h3>
                <div class="faq-list">
                  {#each block.faqs as faq, index (faq._key)}
                    <div class="faq-item {activeFaqIndex === index ? 'active' : ''}">
                      <button class="faq-question" on:click={() => toggleFaq(index)}>
                        {faq.question}
                        <span class="toggle-icon">{activeFaqIndex === index ? '−' : '+'}</span>
                      </button>
                      {#if activeFaqIndex === index}
                        <div class="faq-answer">
                          {#each faq.answer as answer}
                            <p>{answer.children[0].text}</p>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Hero Section */
  .hero {
    position: relative;
    height: 60vh;
    min-height: 400px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    /* margin-bottom: 1rem; */
  }
    .contact-form-bg {
    padding: 4rem 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);

    color: white;
    
    

   
  }
  .contact-form-bg .contact-form-wrapper{
    max-width:600px;
    margin:0 auto

  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    padding: 0 2rem;
  }

  .hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  /* Contact Section */
  .contact-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: white;
  }

  .container {
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 0 2rem;
  }

  .contact-grid {
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    gap: 3rem;
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Contact Form */
  .contact-form-wrapper {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2.5rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .contact-form-wrapper h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #fff;
    text-align: center;
  }

  .form-group {
    position: relative;
    margin-bottom: 2rem;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 1rem 0;
    font-size: 1rem;
    color: #fff;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    outline: none;
  }

  .form-group textarea {
    min-height: 120px;
    resize: vertical;
  }

  .form-group label {
    position: absolute;
    top: 1rem;
    left: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .form-group input:focus ~ label,
  .form-group input:valid ~ label,
  .form-group textarea:focus ~ label,
  .form-group textarea:valid ~ label {
    top: -1.2rem;
    font-size: 0.8rem;
    color: #4cc9f0;
  }

  .border-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #4cc9f0 0%, #4361ee 100%);
    transition: width 0.4s ease;
  }

  .form-group input:focus ~ .border-line,
  .form-group textarea:focus ~ .border-line {
    width: 100%;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(90deg, #4cc9f0 0%, #4361ee 100%);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.4);
  }

  .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .error-message {
    color: #ff3860;
    margin-bottom: 1rem;
    text-align: center;
  }

  .success-message {
    color: #4cc9f0;
    text-align: center;
    padding: 1rem;
    background: rgba(76, 201, 240, 0.1);
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  /* Map & FAQ Section */
  .map-faq-wrapper {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    width:100%;
  }

  .map-container {
    background: rgba(255, 255, 255, 0.05);
    width:40%;
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .map-container h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  .map-embed {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(22, 33, 62, 0.2) 0%,
      rgba(22, 33, 62, 0.8) 100%
    );
  }

  .contact-info p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .contact-info strong {
    color: #fff;
  }

  /* FAQ Section */
  .faq-container {
    width:60%;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .faq-container h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-item {
    border-radius: 8px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .faq-item.active {
    background: rgba(76, 201, 240, 0.1);
  }

  .faq-question {
    width: 100%;
    padding: 1.2rem;
    text-align: left;
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .faq-question:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .toggle-icon {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4cc9f0;
  }

  .faq-answer {
    padding: 0 1.2rem 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }

  .faq-answer p {
    margin: 0;
  }
</style>