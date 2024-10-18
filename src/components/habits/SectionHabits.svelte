<script lang="ts">
	import ListHabits from "$components/habits/ListHabits.svelte";
	import CreateHabit from "$components/habits/CreateHabit.svelte";
	import ManageHabitsToggle from "$components/habits/ManageHabitsToggle.svelte";
	import ProgressBar from "$components/habits/ProgressBar.svelte";

	import { habitsData } from "$stores/habit.store";
	import type { Habit } from "$utils/types/entities";

	$: habits = $habitsData as Habit[];
</script>

<section class="flex flex-col gap-4 w-full h-full">
	{#if habits.length > 0}
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
