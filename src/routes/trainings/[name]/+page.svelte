<script lang="ts">
	import { page } from "$app/stores";

	import Section from "$components/layouts/Section.svelte";

	let nameTraining: string = $page.params.name;
</script>

<Section>
	<p>Training: {nameTraining}</p>
	<p>Page: {$page.params.page}</p>
</Section>
