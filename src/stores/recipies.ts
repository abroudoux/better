import { writable, type Writable } from "svelte/store";

import type { Recipie } from "$utils/types/entities";

export const recipiesData = writable<Recipie[]>([]);
