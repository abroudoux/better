<script lang="ts">
	import { page } from "$app/stores";

	import SectionLayout from "$lib/components/layouts/SectionLayout.svelte";

	let nameTraining: string = $page.params.name;
</script>

<SectionLayout>
	<p>Training: {nameTraining}</p>
	<p>Page: {$page.params.page}</p>
</SectionLayout>
