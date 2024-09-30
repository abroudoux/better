<script lang="ts">
	import { Trash } from "lucide-svelte";

	import { Checkbox } from "$lib/components/ui/checkbox";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Root, Trigger } from "$lib/components/ui/alert-dialog";
	import DeleteHabit from "$components/habits/DeleteHabit.svelte";

	import type { Habit } from "$utils/types/entities";
	import { manageHabits } from "$stores/habits";
	import { toggleHabitStatus } from "$services/habit.services";

	export let habit: Habit;

	let isCompleted: boolean = habit.isCompleted;
	$: isManagingHabits = $manageHabits;

	// TODO: fix
	function toggleHabit(event: MouseEvent) {
		if (isManagingHabits) return;
		const target = event.target as HTMLElement;
		if (target.tagName === "INPUT") return;
		toggleHabitStatus(fetch, habit.id);
		isCompleted = !isCompleted;
	}
</script>

<li>
	<Root>
		<Trigger asChild let:builder>
			<Button
				class="py-6 flex flex-row items-center justify-start w-full gap-2 border transition-all duration-250 ease-in-out"
				builders={[builder]}
				variant={isManagingHabits ? "delete" : isCompleted ? "completed" : "habit"}
				on:click={toggleHabit}
			>
				{#if !isManagingHabits}
					<Checkbox checked={isCompleted} value={habit.id} />
				{:else}
					<Trash size="18" />
				{/if}
				<div>
					<h3 class="text-sm">{habit.name}</h3>
				</div>
			</Button>
		</Trigger>
		{#if isManagingHabits}
			<DeleteHabit {habit} />
		{/if}
	</Root>
</li>
