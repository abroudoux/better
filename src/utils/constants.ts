import { House, Library, User, Settings, Medal, Blocks } from "lucide-svelte";

import type { MenuItemSidebar } from "$utils/types/interfaces";

export const menuItemsSidebar: MenuItemSidebar[] = [
	{
		label: "Dashboard",
		url: "/",
		icon: House
	},
	{
		label: "Tranings",
		url: "/trainings",
		icon: Medal
	},
	{
		label: "Books",
		url: "/books",
		icon: Library
	},
	{
		label: "Learning",
		url: "/learnings",
		icon: Blocks
	},
	{
		label: "Profile",
		url: "/me",
		icon: User
	},
	{
		label: "Settings",
		url: "/settings",
		icon: Settings
	}
];
