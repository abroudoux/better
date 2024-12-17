import type { SvelteComponent } from "svelte";
import { House, Wallet } from "lucide-svelte";

import type { MenuSidebar } from "$lib/utils/types/interfaces";
import type { Habit } from "$lib/utils/types/entities";

export const menuItemsSidebar: MenuSidebar[] = [
	{
		label: "Dashboard",
		url: "/",
		icon: House as typeof SvelteComponent
	},
	{
		label: "Budget",
		url: "/budget",
		icon: Wallet as typeof SvelteComponent
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
