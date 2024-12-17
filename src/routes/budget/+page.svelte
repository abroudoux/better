<script lang="ts">
	import type { PageData } from "./$types";

	import SectionLayout from "$lib/components/layouts/SectionLayout.svelte";

	export let data: PageData;

	console.log(data);
</script>

<SectionLayout>
	<h1>budget</h1>
</SectionLayout>
