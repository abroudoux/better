import { writable, type Writable } from "svelte/store";

import type { Habit } from "$lib/utils/types/entities";

export const manageHabits: Writable<boolean> = writable(false);
export const createHabit: Writable<boolean> = writable(false);
export const habitsData = writable<Habit[]>([]);
