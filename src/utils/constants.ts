import type { SvelteComponent } from "svelte";
import { House, Medal } from "lucide-svelte";

import type { MenuItemSidebar } from "$utils/types/interfaces";
import type { Habit, Training } from "$utils/types/entities";

export const menuItemsSidebar: MenuItemSidebar[] = [
	{
		label: "Dashboard",
		url: "/",
		icon: House as typeof SvelteComponent
	}
	// {
	// 	label: "Trainings",
	// 	url: "/trainings",
	// 	icon: Medal as typeof SvelteComponent
	// }
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

export const trainingsDataTest: Training[] = [
	{
		id: "0",
		name: "Chest & Arms",
		duration: 50,
		isArchived: false,
		link: "/trainings/0",
		circuits: [
			{
				id: "0",
				name: "Circuit push-ups",
				exercises: [
					{
						id: "1",
						name: "Push-ups classic with 3 second hold at the bottom",
						reps: 20
					},
					{
						id: "2",
						name: "Diamond push-ups with 3 second hold at the bottom",
						reps: 15
					},
					{
						id: "3",
						name: "Archer push-ups with typewriter",
						reps: 5
					}
				],
				restExercice: 60,
				restCircuit: 120,
				reps: 3
			}
		],
		exercises: [
			{
				id: "0",
				name: "Pike push-ups",
				reps: 15,
				sets: 3,
				rest: 60
			},
			{
				id: "1",
				name: "One arm push-ups",
				reps: 5,
				sets: 3,
				rest: 60
			}
		]
	},
	{
		id: "1",
		name: "Back & Shoulders",
		duration: 40,
		isArchived: false,
		link: "/trainings/1",
		circuits: [
			{
				id: "0",
				name: "Circuit pull-ups",
				exercises: [
					{
						id: "1",
						name: "Pull-ups classic",
						reps: 10
					},
					{
						id: "2",
						name: "Chin-ups",
						reps: 10
					},
					{
						id: "3",
						name: "Wide pull-ups",
						reps: 10
					}
				],
				restExercice: 60,
				restCircuit: 120,
				reps: 3
			}
		],
		exercises: [
			{
				id: "0",
				name: "Handstand push-ups",
				reps: 10,
				sets: 3,
				rest: 60
			},
			{
				id: "1",
				name: "Pull-ups",
				reps: 10,
				sets: 3,
				rest: 60
			}
		]
	},
	{
		id: "2",
		name: "Legs",
		duration: 30,
		isArchived: false,
		link: "/trainings/2",
		circuits: [
			{
				id: "0",
				name: "Circuit legs",
				exercises: [
					{
						id: "1",
						name: "Squats",
						reps: 20
					},
					{
						id: "2",
						name: "Lunges",
						reps: 15
					},
					{
						id: "3",
						name: "Jump squats",
						reps: 10
					}
				],
				restExercice: 60,
				restCircuit: 120,
				reps: 3
			}
		],
		exercises: [
			{
				id: "0",
				name: "Pistol squats",
				reps: 10,
				sets: 3,
				rest: 60
			},
			{
				id: "1",
				name: "Glute bridge",
				reps: 15,
				sets: 3,
				rest: 60
			}
		]
	}
];
