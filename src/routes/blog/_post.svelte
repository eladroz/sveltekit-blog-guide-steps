<script>
  export let title;
  export let date;
  export let categories;
  import { page } from '$app/stores';
</script>

<div data-sb-object-id={"src/routes" + $page.url.pathname + ".md"}>
  <h1 data-sb-field-path="title">{title}</h1>

  <p>Published: <span data-sb-field-path="date">{date}</span></p>

  <span data-sb-field-path="markdown_content">
    <slot />
  </span>  

  {#if categories.length}
    <aside>
      <h2>Posted in:</h2>
      <ul data-sb-field-path="categories">
        {#each categories as category}
          <li>
            <a href="/blog/categories/{category}">
              {category}
            </a>
          </li>
        {/each}
      </ul>
    </aside>
  {/if}
</div>
