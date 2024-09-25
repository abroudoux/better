<script lang="ts">
	import ItemHabit from "$components/habits/ItemHabit.svelte";

	import { habitsTest } from "$utils/constants";
</script>

<ul class="grid grid-cols-4 items-start gap-4">
	{#each habitsTest as habit}
		<ItemHabit {habit} />
	{/each}
</ul>
