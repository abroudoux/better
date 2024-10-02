import type { SvelteComponent } from "svelte";
import { House, Library, User, Medal, Salad } from "lucide-svelte";

import type { MenuItemSidebar } from "$utils/types/interfaces";
import type { Habit, Training } from "$utils/types/entities";

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

export const trainingsDataTest: Training[] = [
	{
		id: "1",
		name: "Chest",
		exercises: [
			{
				id: "1",
				name: "Bench Press",
				sets: 4,
				reps: 12
			},
			{
				id: "2",
				name: "Incline Bench Press",
				sets: 4,
				reps: 12
			}
		]
	},
	{
		id: "2",
		name: "Back",
		exercises: [
			{
				id: "1",
				name: "Deadlift",
				sets: 4,
				reps: 12
			},
			{
				id: "2",
				name: "Pull Ups",
				sets: 4,
				reps: 12
			}
		]
	}
];
