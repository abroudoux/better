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
	<div class="w-full flex flex-row justify-between items-center">
		<h2 class="text-2xl font-semibold">Habits</h2>
		<div class="flex flex-row items-center gap-4">
			<ManageHabitsToggle />
			<CreateHabit />
		</div>
	</div>
	{#if habits.length > 0}
		<ListHabits />
		<div class="mt-auto">
			<ProgressBar />
		</div>
	{:else}
		<p class="text-gray-500">No habits yet</p>
	{/if}
</section>
