<script lang="ts">
	import ItemHabit from "$components/habits/ItemHabit.svelte";

	import type { Habit } from "$utils/types/entities";
	import { habitsData } from "$stores/habit.store";

	$: habits = $habitsData as Habit[];
</script>

<ul class="grid grid-cols-4 items-start gap-4">
	{#each habits as habit}
		<ItemHabit {habit} />
	{/each}
</ul>
