import type { SvelteComponent } from "svelte";
import { House } from "lucide-svelte";

import type { MenuSidebar } from "$utils/types/interfaces";
import type { Habit } from "$utils/types/entities";

export const menuItemsSidebar: MenuSidebar[] = [
	{
		label: "Dashboard",
		url: "/",
		icon: House as typeof SvelteComponent
	}
];

export const habitsDataTest: Habit[] = [
	{
		id: "0",
		name: "Drink water",
		isCompleted: false
	},
	{
		id: "1",
		name: "Read",
		isCompleted: false
	},
	{
		id: "2",
		name: "Exercise",
		isCompleted: false
	}
];
