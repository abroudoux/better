<script lang="ts">
	import ListHabits from "$components/habits/ListHabits.svelte";
	import CreateHabit from "$components/habits/CreateHabit.svelte";
	import ProgressBar from "$components/habits/ProgressBar.svelte";

	import { habitsTest } from "$utils/constants";
</script>

<div class="flex flex-col gap-4 w-full h-full">
	<div class="w-full flex flex-row justify-between items-center">
		<h2 class="text-2xl font-semibold">Habits</h2>
		<CreateHabit />
	</div>
	<ListHabits habits={habitsTest} />
	<ProgressBar habits={habitsTest} />
</div>
