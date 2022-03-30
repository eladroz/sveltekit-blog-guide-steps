<script context="module">
  export async function load({ fetch }) {
    console.log("load for blog index");
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()

    return {
      props: {
        posts: allPosts
      }
    }
  }
</script>


<script>
  export let posts
</script>


{#each posts as post}
  <div data-sb-object-id={"src/routes" + post.path + ".md"}>
    <h2>
      <a href={post.path} data-sb-field-path="title">
        {post.meta.title}
      </a>
    </h2>
    Published {post.meta.date}
  </div>
{/each}