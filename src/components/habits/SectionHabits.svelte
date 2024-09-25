<script lang="ts">
	import ListHabits from "$components/habits/ListHabits.svelte";
	import CreateHabit from "$components/habits/CreateHabit.svelte";
	import ManageHabits from "$components/habits/ManageHabits.svelte";
	import ProgressBar from "$components/habits/ProgressBar.svelte";
	import CalendarCaroussel from "$components/global/calendar/CalendarCaroussel.svelte";

	import Button from "$lib/components/ui/button/button.svelte";

	import { habitsTest } from "$utils/constants";
</script>

<div class="flex flex-col gap-4 w-full h-full">
	<!-- <CalendarCaroussel /> -->
	<div class="w-full flex flex-row justify-between items-center">
		<h2 class="text-2xl font-semibold">Habits</h2>
		<div class="flex flex-row items-center gap-4">
			<ManageHabits />
			<CreateHabit />
		</div>
	</div>
	<ListHabits habits={habitsTest} />
	<div class="mt-auto">
		<ProgressBar habits={habitsTest} />
	</div>
</div>
