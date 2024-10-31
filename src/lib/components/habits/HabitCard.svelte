<script lang="ts">
	import { Trash } from "lucide-svelte";

	import { Checkbox } from "$lib/components/ui/checkbox";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Root, Trigger } from "$lib/components/ui/alert-dialog";
	import DeleteHabit from "$lib/components/habits/DeleteHabitDialog.svelte";

	import type { Habit } from "$utils/types/entities";
	import { manageHabits, habitsData } from "$stores/habit.store";
	import { toggleHabitStatus } from "$services/habits.services";

	export let habit: Habit;

	let isCompleted: boolean = habit.isCompleted;
	$: isManagingHabits = $manageHabits;

	// TODO: fix
	function toggleHabit(event: MouseEvent) {
		if (isManagingHabits) return;

		const target = event.target as HTMLElement;
		if (target.tagName === "INPUT") return;

		toggleHabitStatus(fetch, habit.id).then(() => {
			habitsData.update((habits) => {
				const index = habits.findIndex((h) => h.id === habit.id);
				if (index !== -1) {
					habits[index].isCompleted = !habits[index].isCompleted;
				}
				return habits;
			});
		});

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
