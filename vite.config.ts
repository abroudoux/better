import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	server: {
		host: "0.0.0.0"
	},
	plugins: [sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}", "tests/**/*.{test,spec}.{js,ts}"]
	}
});
