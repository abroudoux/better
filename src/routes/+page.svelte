<script lang="ts">
	import type { PageData } from "./$types";

	import SectionLayout from "$lib/components/layouts/SectionLayout.svelte";
	import Loader from "$lib/components/global/Loader.svelte";
	import ListHabits from "$lib/components/habits/ListHabits.svelte";
	import CreateHabit from "$lib/components/habits/CreateHabitModal.svelte";
	import ManageHabitsToggle from "$lib/components/habits/ManageHabitsToggle.svelte";
	import ProgressBar from "$lib/components/habits/ProgressBar.svelte";

	import { habitsData } from "$stores/habit.store";

	export let data: PageData;

	let isLoading: boolean = true;

	$: if (!data.habits) {
		isLoading = true;
	} else {
		setTimeout(() => {
			habitsData.set(data.habits);
			isLoading = false;
		}, 50);
	}
</script>

<SectionLayout>
	{#if isLoading}
		<Loader />
	{:else}
		<section class="flex flex-col gap-8 w-full h-full">
			{#if habitsData}
				<div class="w-full flex flex-row justify-between items-center">
					<h2 class="text-3xl font-semibold">Habits</h2>
					<div class="flex flex-row items-center gap-4">
						<ManageHabitsToggle />
						<CreateHabit />
					</div>
				</div>
				<ListHabits />
				<div class="mt-auto">
					<ProgressBar />
				</div>
			{:else}
				<div class="w-full h-full flex items-center flex-col justify-center gap-8">
					<h2 class="text-3xl font-semibold max-w-3xl text-center">
						You have created any habits yet. Start your journey by select new daily challenges
					</h2>
					<CreateHabit />
				</div>
			{/if}
		</section>
	{/if}
</SectionLayout>
