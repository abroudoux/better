import { writable, type Writable } from "svelte/store";

import type { Habit } from "$utils/types/entities";

export const manageHabits: Writable<boolean> = writable(false);
export const habitsData = writable<Habit[]>([]);
