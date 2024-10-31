import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$lib: "./src/lib",
			$stores: "./src/stores",
			$utils: "./src/utils",
			$styles: "./src/styles",
			$services: "./src/services",
			$api: "src/routes/api"
		}
	}
};

export default config;
