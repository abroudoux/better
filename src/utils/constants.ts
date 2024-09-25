import type { SvelteComponent } from "svelte";
import { House, Library, User, Medal, Salad } from "lucide-svelte";

import type { MenuItemSidebar } from "$utils/types/interfaces";
import type { Habit } from "$utils/types/entities";

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
		label: "Recipies",
		url: "/recipies",
		icon: Salad as typeof SvelteComponent
	},
	{
		label: "Profile",
		url: "/me",
		icon: User as typeof SvelteComponent
	}
];

export const habitsTest: Habit[] = [
	{
		id: "1",
		title: "Read",
		description: "Read a book for 30 minutes",
		isCompleted: false,
		points: 10
	},
	{
		id: "2",
		title: "Workout",
		description: "Workout for 1 hour",
		isCompleted: false,
		points: 10
	},
	{
		id: "3",
		title: "Meditate",
		description: "Meditate for 15 minutes",
		isCompleted: false,
		points: 10
	},
	{
		id: "4",
		title: "Drikn water",
		description: "Drink 2 liters of water",
		isCompleted: false,
		points: 10
	},
	{
		id: "5",
		title: "Sleep",
		description: "Sleep for 8 hours",
		isCompleted: false,
		points: 10
	}
];
