<script lang="ts">
	import HabitCard from "$lib/components/habits/HabitCard.svelte";
	import type { Habit } from "$lib/utils/types/entities";
	import { habitsData } from "$lib/stores/habit.store";

	$: habits = $habitsData as Habit[];
</script>

<ul class="grid grid-cols-4 items-start gap-4">
	{#each habits as habit}
		<HabitCard {habit} />
	{/each}
</ul>
