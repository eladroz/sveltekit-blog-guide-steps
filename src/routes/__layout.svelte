<script context="module">
  export const load = ({ url }) => {
    const currentRoute = url.pathname

    return {
      props: {
        currentRoute
      }
    }
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte'
  import '$lib/scss/style.scss'

  export let currentRoute

  if (import.meta.hot) {
    import.meta.hot.on('content-update', (data) => {
      console.log("Got content update", data);
      import.meta.hot.invalidate();
    });
  }
</script>

<Header />

{#key currentRoute}
  <main>
    <slot />
  </main>
{/key}

<footer>Hello, I'm the footer.</footer>