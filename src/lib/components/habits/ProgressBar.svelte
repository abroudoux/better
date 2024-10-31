<script lang="ts">
	import { toast } from "svelte-sonner";

	import { Progress } from "$lib/components/ui/progress";

	import { habitsData } from "$stores/habit.store";
	import type { Habit } from "$utils/types/entities";

	$: habits = $habitsData as Habit[];
	$: habitsLength = habits.length;
	$: habitsCompleted = habits.filter((h) => h.isCompleted).length;
	$: habitsAllCompleted = habits.every((habit) => habit.isCompleted);
	$: progress = habitsLength > 0 ? (habitsCompleted / habitsLength) * 100 : 0;
	$: {
		if (habitsAllCompleted) {
			toast.success(
				"Congratulations! You've completed all your daily habits! Determine your next challenge."
			);
		}
	}
</script>

<div>
	<p class={`text-right text-sm py-4 ${habitsAllCompleted ? "text-green-500" : "text-primary"}`}>
		{habitsCompleted} / {habitsLength}
	</p>
	<Progress value={progress} />
</div>
