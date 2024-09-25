<script lang="ts">
	import DayCardCalendar from "$components/global/calendar/DayCardCalendar.svelte";

	import { Root, Content } from "$lib/components/ui/carousel";
</script>

<Root
	opts={{
		align: "start"
	}}
	class="w-full"
>
	<Content>
		{#each Array(5) as _, i (i)}
			<DayCardCalendar number={i + 1} />
		{/each}
	</Content>
</Root>
