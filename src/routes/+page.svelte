<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	import SectionHabits from "$components/habits/SectionHabits.svelte";
	import Section from "$components/layouts/Section.svelte";
	import Loader from "$components/global/Loader.svelte";

	import type { Habit } from "$utils/types/entities";

	export let data: PageData;

	let isLoading: boolean = true;
	let habits: Habit[] = [];

	$: if (!data.habits) {
		isLoading = true;
	} else {
		setTimeout(() => {
			habits = data.habits;
			isLoading = false;
		}, 100);
	}
</script>

<Section>
	{#if isLoading}
		<Loader />
	{:else}
		<SectionHabits {habits} />
	{/if}
</Section>
