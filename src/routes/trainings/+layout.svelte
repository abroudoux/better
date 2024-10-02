<script lang="ts">
	import Section from "$components/layouts/Section.svelte";
	import SectionTrainings from "$components/trainings/SectionTrainings.svelte";
</script>

<Section>
	<SectionTrainings />
	<div class="h-full w-full py-4">
		<slot />
	</div>
</Section>
