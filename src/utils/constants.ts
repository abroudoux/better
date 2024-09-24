import type { SvelteComponent } from "svelte";
import { House, Library, User, Settings, Medal, Blocks } from "lucide-svelte";

import type { MenuItemSidebar } from "$utils/types/interfaces";

export const menuItemsSidebar: MenuItemSidebar[] = [
	{
		label: "Dashboard",
		url: "/",
		icon: House as typeof SvelteComponent
	},
	{
		label: "Trainings",
		url: "/trainings",
		icon: Medal as typeof SvelteComponent
	},
	{
		label: "Books",
		url: "/books",
		icon: Library as typeof SvelteComponent
	},
	{
		label: "Learnings",
		url: "/learnings",
		icon: Blocks as typeof SvelteComponent
	},
	{
		label: "Profile",
		url: "/me",
		icon: User as typeof SvelteComponent
	},
	{
		label: "Settings",
		url: "/settings",
		icon: Settings as typeof SvelteComponent
	}
];
