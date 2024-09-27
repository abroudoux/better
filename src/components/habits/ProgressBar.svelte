<script lang="ts">
	import { Progress } from "$lib/components/ui/progress";

	import type { Habit } from "$utils/types/entities";

	export let habits: Habit[] = [];

	$: habitsLength = habits.length;
	$: habitsCompleted = habits.filter((h) => h.isCompleted).length;
	$: habitsAllCompleted = habits.every((habit) => habit.isCompleted);
	$: progress = habitsLength > 0 ? (habitsCompleted / habitsLength) * 100 : 0;
</script>

<div class="my-2">
	<p class={`text-right text-sm py-4 ${habitsAllCompleted ? "text-green-500" : "text-primary"}`}>
		{habitsCompleted} / {habitsLength}
	</p>
	<Progress value={progress} />
</div>
