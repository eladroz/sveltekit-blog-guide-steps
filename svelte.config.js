import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
			  {
				name: 'watch-content',
				configureServer(server) {
					server.watcher.add('./routes');
				},
				handleHotUpdate(ctx) {
				  	let m = /\/routes(\/.*)\.md$/.exec(ctx.file);
				  	if (m) {
						const relativePath = m[1];
						console.log("Content file changed:", relativePath);
						ctx.server.ws.send({
							type: 'custom',
							event: 'content-update',
							data: { relativePath },
						});
						return []; // Return an empty module list since we handled it manually.
					}
					return ctx.modules; // Not an event we care about, so just do the default behavior.
				},
			},
		]},
	},	
  	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [
				rehypeSlug,
				rehypeAutolinkHeadings,
			],
			layout: {
				Post: 'src/routes/blog/_post.svelte'
			}
		}),	  
  	],
	extensions: ['.svelte', '.md'],
};

export default config;
