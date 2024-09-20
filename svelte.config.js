import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$components: "./src/components",
			$lib: "./src/lib",
			$stores: "./src/stores",
			$utils: "./src/utils",
			$types: "./src/types",
			$styles: "./src/styles"
		}
	}
};

export default config;
