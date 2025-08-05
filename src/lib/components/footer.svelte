<script lang="ts">
  import { urlFor } from '../utils/image-builder';
  export let footerData: any;

  const logo = footerData?.footerLogo;
  const menus = footerData?.footerMenus ?? [];
  const footerTitle = footerData?.footerTitle ?? '';
</script>

<footer class="footer">
  <div class="footer-columns">
    <!-- Column 1: Logo + Company Overview -->
    <div class="footer-about">
      {#if logo}
        <div class="footer-logo">
          <img
            src={urlFor(logo).width(150).format('webp').url()}
            srcset={`${urlFor(logo).width(75).format('webp').url()} 1x, ${urlFor(logo).width(150).format('webp').url()} 2x`}
            alt={footerTitle || 'Footer Logo'}
            width="100"
          />
        </div>
      {/if}
      {#if footerData?.footerText}
        <div class="footer-text">
          <p>{footerData.footerText}</p>
        </div>
      {/if}
    </div>

    <!-- Column 2: Useful Links -->
    {#if menus.length}
      <div class="footer-links">
        <h4>Useful Links</h4>
        {#each menus as menu}
          <div class="footer-menu">
            <ul>
              {#each menu.links as link}
                <li>
                  <a href={link.slug?.current ? (link.slug.current.startsWith('/') ? link.slug.current : '/' + link.slug.current) : '#'}>
                    {link.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Column 3: Contact Info -->
    {#if footerData?.addressSection}
      <div class="footer-contact">
        <h4>{footerData.addressSection.addressTitle || 'Contact'}</h4>
        {#if footerData.addressSection.address}
          <p>{footerData.addressSection.address}</p>
        {/if}
        {#if footerData.addressSection.email}
          <p>Email: <a href={`mailto:${footerData.addressSection.email}`}>{footerData.addressSection.email}</a></p>
        {/if}
        {#if footerData.addressSection.phone}
          <p>Phone: <a href={`tel:${footerData.addressSection.phone}`}>{footerData.addressSection.phone}</a></p>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Social Icons -->
  {#if footerData?.socialLinks?.length}
    <div class="footer-social">
      {#each footerData.socialLinks as social}
        {#if social.url}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            class="social-icon"
          >
            <i class={`fab fa-${social.iconName}`}></i>
          </a>
        {/if}
      {/each}
    </div>
  {/if}

  <!-- Copyright -->
  {#if footerData?.copyrightText}
    <div class="footer-bottom">
      <p>{footerData.copyrightText}</p>
    </div>
  {/if}
</footer>

<style>
  :root {
    --primary-bg: #ffffff;
    --highlight-color: #0d79d3;
    --text-color: #333;
    --soft-shadow: 2px 2px 4px rgba(0,0,0,0.05);
    --soft-highlight: -2px -2px 4px rgba(255,255,255,0.8);
  }

  .footer {
    background-color: var(--primary-bg);
    color: var(--text-color);
    padding: 3rem 2rem 1.5rem;
    font-family: 'Helvetica Neue', sans-serif;
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .footer-columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  .footer-about,
  .footer-links,
  .footer-contact {
    flex: 1 1 300px;
    font-size: 0.95rem;
    color: #555;
  }

  .footer-logo img {
    display: block;
    margin-bottom: 1rem;
    max-width: 100px;
    filter: drop-shadow(var(--soft-shadow));
  }

  .footer-text h4,
  .footer-links h4,
  .footer-contact h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--highlight-color);
    position: relative;
    display: inline-block;
  }

  .footer-text h4:after,
  .footer-links h4:after,
  .footer-contact h4:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--highlight-color);
    border-radius: 3px;
    box-shadow: var(--soft-shadow), var(--soft-highlight);
  }

  .footer-text p,
  .footer-contact p {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 0.75rem;
  }

  .footer-links a {
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.2s ease;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    display: inline-block;
  }

  .footer-links a:hover {
    color: var(--highlight-color);
    background: rgba(13, 121, 211, 0.05);
    box-shadow: var(--soft-shadow), var(--soft-highlight);
    transform: translateY(-1px);
  }

  .footer-social {
    margin: 2.5rem auto;
    display: flex;
    justify-content: center;
    gap: 1.25rem;
  }

  .social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--primary-bg);
    box-shadow: var(--soft-shadow), var(--soft-highlight);
    transition: all 0.3s ease;
    color: var(--highlight-color);
  }

  .social-icon:hover {
    transform: translateY(-2px);
    box-shadow: 3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.8);
  }

  .social-icon i {
    font-size: 1.1rem;
  }

  .footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    font-size: 0.85rem;
    color: #777;
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .footer-contact p a {
    text-decoration: none;
    color: var(--text-color);
    transition: color 0.2s ease;
  }

  .footer-contact p a:hover {
    color: var(--highlight-color);
  }

  @media (max-width: 768px) {
    .footer {
      padding: 2rem 1rem;
    }

    .footer-columns {
      flex-direction: column;
      gap: 2rem;
    }

    .footer-about,
    .footer-links,
    .footer-contact {
      width: 100%;
      flex: 0;
      text-align: center;
    }

    .footer-text h4:after,
    .footer-links h4:after,
    .footer-contact h4:after {
      left: 50%;
      transform: translateX(-50%);
    }

    .footer-logo {
      display: flex;
      justify-content: center;
    }

    .footer-links a {
      padding: 0.3rem 1rem;
    }
  }
</style>