<script lang="ts">
	import AddTraining from "$components/trainings/AddTraining.svelte";
	import CalendarCarousel from "$components/global/calendar/CalendarCarousel.svelte";

	// import { trainingsData } from "$stores/training.store";
	import type { Training } from "$utils/types/entities";
	import { trainingsDataTest } from "$utils/constants";

	// $: trainings = $trainingsData as Training[];
</script>

<section class="flex flex-col gap-4 w-full h-auto">
	<div class="w-full flex flex-row justify-between items-center">
		<h2 class="text-2xl font-semibold">Trainings</h2>
		<div class="flex flex-row items-center gap-4">
			<AddTraining />
		</div>
	</div>
	<CalendarCarousel data={trainingsDataTest} />
</section>
