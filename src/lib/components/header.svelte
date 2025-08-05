<script lang="ts">
  import { urlFor } from '../utils/image-builder';
  import { onMount } from 'svelte';

  export let menu: any;

  const items = menu?.items ?? [];
  const logo = menu?.headerLogo;

  const srcset = [100, 150, 200, 300]
    .map(w => `${urlFor(logo).width(w).format('webp').url()} ${w}w`)
    .join(', ');

  const sizes = '(max-width: 600px) 100px, 150px';

  let isMenuOpen = false;
  let scrolled = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 10;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header class="site-header {scrolled ? 'scrolled' : ''}">
  <a href="/" class="logo">
    <img
      src={urlFor(logo).width(150).format('webp').url()}
      srcset={srcset}
      sizes={sizes}
      alt="Logo"
    />
  </a>

  <button class="hamburger {isMenuOpen ? 'open' : ''}" on:click={toggleMenu} aria-label="Toggle Menu">
    <div class="bar top"></div>
    <div class="bar middle"></div>
    <div class="bar bottom"></div>
  </button>
</header>

<!-- Fullscreen Overlay -->
<div class="menu-overlay {isMenuOpen ? 'open' : ''}">
  <div class="overlay-bg" on:click={closeMenu}></div>

  <aside class="menu-panel">
    <ul class="menu-list">
      {#each items as item}
        <li>
          <a href={"/" + (item.slug?.current ?? '')} on:click={closeMenu}>
            {item.title}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1001;
    transition: all 0.3s ease;
    background-color: transparent;
  }

  .site-header.scrolled {
  background-color: #ffffff;
  box-shadow: 6px 6px 12px #bebebe, -6px -6px 12px #ffffff;
  backdrop-filter: blur(5px);
}


  .site-header.scrolled .bar {
    background-color: #0d79d3;
  }

  .logo img {
    height: 50px;
    transition: all 0.3s ease;
  }

  .hamburger {
    background: none;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1002;
    position: relative;
     cursor: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDE0IDE0Ij4KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2I1YjFiMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTAuNSA2LjEzYTIgMiAwIDAgMSAxLjU5IDIuMjRsLS42MSA0LjI3YTEgMSAwIDAgMS0xIC44Nkg0YTEgMSAwIDAgMS0uOTMtLjYzTDIgMTAuMjFhMiAyIDAgMCAxIDEtMi41M0w0LjM1IDdWMmExLjUgMS41IDAgMCAxIDMgMHYzLjV6IiBzdHJva2Utd2lkdGg9IjEiIC8+Cjwvc3ZnPg=="),
    default;
  }

  .hamburger .bar {
    height: 5px;
    width: 100%;
    background-color:#0d79d3;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  /* Hamburger to X animation */
  .hamburger.open .top {
    transform: translateY(9.5px) rotate(45deg);
  }

  .hamburger.open .middle {
    opacity: 0;
    transform: scale(0);
  }

  .hamburger.open .bottom {
    transform: translateY(-9.5px) rotate(-45deg);
  }

  /* Fullscreen Overlay Container */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s;
  }

  .menu-overlay.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  /* Dark background behind panel */
  .overlay-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .menu-overlay.open .overlay-bg {
    opacity: 1;
  }

  /* Right slide-in panel */
  .menu-panel {
    width: 350px;
    max-width: 90%;
    height: 100%;
    color: white;
    padding: 3rem 2rem;
    transform: translateX(100%);
    transition: transform 0.4s ease;
    position: relative;
    z-index: 1;
    border-left: 1px solid #333;
  }

  .menu-overlay.open .menu-panel {
    transform: translateX(0);
  }

  .menu-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 4rem;
  }

  .menu-list li a {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    display: block;
    padding: 0.5rem 0;
      cursor: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDE0IDE0Ij4KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2I1YjFiMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTAuNSA2LjEzYTIgMiAwIDAgMSAxLjU5IDIuMjRsLS42MSA0LjI3YTEgMSAwIDAgMS0xIC44Nkg0YTEgMSAwIDAgMS0uOTMtLjYzTDIgMTAuMjFhMiAyIDAgMCAxIDEtMi41M0w0LjM1IDdWMmExLjUgMS41IDAgMCAxIDMgMHYzLjV6IiBzdHJva2Utd2lkdGg9IjEiIC8+Cjwvc3ZnPg=="),
    default;
  }

  .menu-list li a:hover {
    color: #0d79d3;
  }

  @media (max-width: 768px) {
    .menu-list li a {
      font-size: 1.8rem;
    }

    .close-btn {
      font-size: 2rem;
    }
  }
</style>