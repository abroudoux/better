import { writable, type Writable } from "svelte/store";

export const manageHabits: Writable<boolean> = writable(false);
