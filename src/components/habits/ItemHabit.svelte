<script lang="ts">
	import { Checkbox } from "$lib/components/ui/checkbox";

	import type { Habit } from "$utils/types/entities";

	export let habit: Habit;
	let isCompleted: boolean = habit.isCompleted;

	function toggleCheckbox(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.tagName === "INPUT") return;

		isCompleted = !isCompleted;
	}
</script>

<li>
	<button
		class={`w-full flex flex-row items-start justify-start gap-4 px-6 py-4 rounded-lg border 
        ${isCompleted ? "bg-green-500/25 border-green-500" : "bg-muted-foreground/5"}`}
		on:click={toggleCheckbox}
	>
		<Checkbox checked={isCompleted} value={habit.id} />
		<div>
			<h3 class="text-sm">{habit.description}</h3>
		</div>
	</button>
</li>
