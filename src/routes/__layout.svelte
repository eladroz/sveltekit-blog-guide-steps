<script context="module">
  export const load = ({ url }) => {
    const currentRoute = url.pathname
    console.log("load for __layout");
    return {
      props: {
        currentRoute
      }
    }
  }
</script>

<script>
import { invalidate } from '$app/navigation';

  import Header from '$lib/components/Header.svelte'
  import '$lib/scss/style.scss'

  export let currentRoute

  if (import.meta.hot) {
    import.meta.hot.on('content-update', (data) => {
      console.log("Got content update", data, "current route:", currentRoute);
      // This works ok for .svelte pages, but not for mdsvex (as the load() function does not run there)
      invalidate(currentRoute).then((e)=> { console.log("then", e);}).catch((e)=> { console.log("catch", e);});
      //import.meta.hot.invalidate() // Full reload of page (incl. FOUC)
    });
  }
</script>

<Header />

{#key currentRoute}
  <main>a
    <slot />
  </main>
{/key}

<footer>Hello, I'm the footer.</footer>