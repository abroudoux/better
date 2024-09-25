<script lang="ts">
	import ListHabits from "$components/habits/ListHabits.svelte";
	import CreateHabit from "$components/habits/CreateHabit.svelte";
	import ManageHabitsToggle from "$components/habits/ManageHabitsToggle.svelte";
	import ProgressBar from "$components/habits/ProgressBar.svelte";
	import CalendarCaroussel from "$components/global/calendar/CalendarCaroussel.svelte";

	import { habitsTest } from "$utils/constants";
</script>

<section class="flex flex-col gap-4 w-full h-full">
	<!-- <CalendarCaroussel /> -->
	<div class="w-full flex flex-row justify-between items-center">
		<h2 class="text-2xl font-semibold">Habits</h2>
		<div class="flex flex-row items-center gap-4">
			<ManageHabitsToggle />
			<CreateHabit />
		</div>
	</div>
	<ListHabits habits={habitsTest} />
	<div class="mt-auto">
		<ProgressBar habits={habitsTest} />
	</div>
</section>
