<script lang="ts">
	import { onMount } from "svelte";

	import SectionHabits from "$components/habits/SectionHabits.svelte";
	import Section from "$components/layouts/Section.svelte";
	import Loader from "$components/global/Loader.svelte";

	let isLoading: boolean = true;

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 50);
	});
</script>

<Section>
	{#if isLoading}
		<Loader />
	{:else}
		<SectionHabits />
	{/if}
</Section>
