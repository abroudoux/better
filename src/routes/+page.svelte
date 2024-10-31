<script lang="ts">
	import type { PageData } from "./$types";

	import SectionHabits from "$lib/components/habits/SectionHabits.svelte";
	import SectionLayout from "$lib/components/layouts/SectionLayout.svelte";
	import Loader from "$lib/components/global/Loader.svelte";

	import { habitsData } from "$stores/habit.store";

	export let data: PageData;

	let isLoading: boolean = true;

	//! DEBUG
	if (process.env.NODE_ENV === "development") console.log("Habits {+page.ts}:", data.habits);

	$: if (!data.habits) {
		isLoading = true;
	} else {
		setTimeout(() => {
			habitsData.set(data.habits);
			isLoading = false;
		}, 100);
	}
</script>

<SectionLayout>
	{#if isLoading}
		<Loader />
	{:else}
		<SectionHabits />
	{/if}
</SectionLayout>
