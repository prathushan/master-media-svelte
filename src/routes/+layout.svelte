<!-- /src/routes/+layout.svelte -->
<script lang="ts">
  export let data;
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
  import "../app.css";
</script>

<svelte:head>
  <title>Master media</title>
  <meta
    name="description"
    content="Hope Cathedral – A place of hope and restoration"
  />
</svelte:head>

<Header menu={data.menu} liveService={data.liveService} />

<main>
  <slot />
</main>

<Footer footerData={data.footerSetting} />
