<script lang="ts">
	import { Progress } from "$lib/components/ui/progress";

	import type { Habit } from "$utils/types/entities";
	import { getProgressHabits } from "$utils/habits";

	export let habits: Habit[] = [];

	let progress = getProgressHabits(habits);
</script>

<div class="my-2">
	<Progress value={progress} />
</div>
