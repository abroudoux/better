<script lang="ts">
	import Section from "$lib/components/layouts/SectionLayout.svelte";
	import CreateTrainingModal from "$lib/components/trainings/CreateTrainingModal.svelte";
	import CalendarCarousel from "$lib/components/global/calendar/CalendarCarousel.svelte";

	import type { Training } from "$utils/types/entities";
	import { trainingsDataTest } from "$utils/constants";

	// $: trainings = $trainingsData as Training[];
</script>

<Section>
	<div class="flex flex-col gap-8 w-full h-auto">
		<div class="w-full flex flex-row justify-between items-center">
			<h2 class="text-3xl font-semibold">Trainings</h2>
			<div class="flex flex-row items-center gap-4">
				<CreateTrainingModal />
			</div>
		</div>
		<CalendarCarousel data={trainingsDataTest} />
	</div>
	<div class="h-full w-full py-4">
		<slot />
	</div>
</Section>
