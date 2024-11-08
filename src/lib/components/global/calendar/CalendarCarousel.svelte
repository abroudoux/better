<script lang="ts">
	import { Root, Content } from "$lib/components/ui/carousel/index";
	import CardDayCalendar from "$lib/components/global/calendar/CardDayCalendar.svelte";

	export let data;
</script>

<Root class="w-full max-h-64">
	<Content>
		{#each data as item}
			<CardDayCalendar name={item.name} link={item.link} />
		{/each}
	</Content>
</Root>
