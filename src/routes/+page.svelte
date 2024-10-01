<script lang="ts">
	import type { PageData } from "./$types";

	import SectionHabits from "$components/habits/SectionHabits.svelte";
	import Section from "$components/layouts/Section.svelte";
	import Loader from "$components/global/Loader.svelte";

	import { habitsData } from "$stores/habits";

	export let data: PageData;

	let isLoading: boolean = true;

	$: if (!data.habits) {
		isLoading = true;
	} else {
		setTimeout(() => {
			habitsData.set(data.habits);
			isLoading = false;
		}, 100);
	}
</script>

<Section>
	{#if isLoading}
		<Loader />
	{:else}
		<SectionHabits />
	{/if}
</Section>
