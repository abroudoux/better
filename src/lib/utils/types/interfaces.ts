import type { SvelteComponent } from "svelte";

export interface MenuSidebar {
	label: string;
	url: string;
	icon: typeof SvelteComponent;
}
