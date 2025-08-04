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
  .footer {
    background-color: #fff;
    color: #1f1f1f;
    padding: 4rem 2rem 2rem;
    font-family: 'Helvetica Neue', sans-serif;
    border-top: 1px solid #e0e0e0;
  }

  .footer-columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
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
  }

  .footer-text h4,
  .footer-links h4,
  .footer-contact h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #0d79d3;
  }

  .footer-text p,
  .footer-contact p {
    margin-bottom: 0.5rem;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 0.5rem;
  }

  .footer-links a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #0d79d3;
    text-decoration: underline;
  }

  .footer-social {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  .footer-social i {
    font-size: 1.3rem;
    color: #226DAB;
    transition: color 0.3s ease;
  }

  .footer-social i:hover {
    color: #1a4f7d;
  }

  .footer-bottom {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.85rem;
    color: #666;
  }

  @media (max-width: 768px) {
    .footer-columns {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .footer-about,
    .footer-links,
    .footer-contact {
      width: 100%;
    }
  }
</style>
