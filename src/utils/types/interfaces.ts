import type { SvelteComponent } from "svelte";

export interface MenuItemSidebar {
	label: string;
	url: string;
	icon: typeof SvelteComponent;
}

export interface DatabaseUserAttributes {
	email: string;
}
