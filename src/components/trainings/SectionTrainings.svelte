<script lang="ts">
	import CreateTrainingModal from "$components/trainings/CreateTrainingModal.svelte";
	import CalendarCarousel from "$components/global/calendar/CalendarCarousel.svelte";

	import type { Training } from "$utils/types/entities";
	import { trainingsDataTest } from "$utils/constants";

	// $: trainings = $trainingsData as Training[];
</script>

<div class="flex flex-col gap-4 w-full h-auto">
	<div class="w-full flex flex-row justify-between items-center">
		<h2 class="text-3xl font-semibold">Trainings</h2>
		<div class="flex flex-row items-center gap-4">
			<CreateTrainingModal />
		</div>
	</div>
	<CalendarCarousel data={trainingsDataTest} />
</div>
