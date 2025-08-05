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
          <div class="footer-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#555" width="20px" height="20px"><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg><p>{footerData.addressSection.address}</p></div>
        {/if}
        {#if footerData.addressSection.email}
          <div class="footer-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#555" width="20px" height="20px"><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg><p>Email: <a href={`mailto:${footerData.addressSection.email}`}>{footerData.addressSection.email}</a></p></div>
        {/if}
        {#if footerData.addressSection.phone}
          <div class="footer-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#555" width="20px" height="20px"><path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/></svg><p>Phone: <a href={`tel:${footerData.addressSection.phone}`}>{footerData.addressSection.phone}</a></p></div>
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
    margin: 0.5rem 0;

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
  .footer-svg{
    display:flex;
    flex-direction: row;
    align-items: center;
    gap:5px;

  }
   .footer-svg svg{
  display:flex;
  flex-direction: column;
  justify-content: center;
align-items: center;

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