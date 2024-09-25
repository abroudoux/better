<script lang="ts">
	import { Progress } from "$lib/components/ui/progress";

	import type { Habit } from "$utils/types/entities";
	import { getProgressHabits } from "$utils/habits";

	export let habits: Habit[] = [];

	const progress = getProgressHabits(habits);
	const habitsCount = habits.length;
	const habitsCompleted = habits.filter((habit) => habit.isCompleted).length;
	const habitsAllCompleted = habits.every((habit) => habit.isCompleted);
</script>

<div class="my-2">
	<p class={`text-right text-s py-4 ${habitsAllCompleted ? "text-green-500" : "text-primary"}`}>
		{habitsCompleted} / {habitsCount}
	</p>
	<Progress value={progress} />
</div>
