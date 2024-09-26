<script lang="ts">
	import { Trash } from "lucide-svelte";

	import { Checkbox } from "$lib/components/ui/checkbox";
	import Button from "$lib/components/ui/button/button.svelte";
	import {
		Root,
		Trigger,
		Content,
		Header,
		Footer,
		Cancel,
		Action,
		Title,
		Description
	} from "$lib/components/ui/alert-dialog";

	import type { Habit } from "$utils/types/entities";
	import { manageHabits } from "$stores/habits";
	// import { toggleHabitStatus } from "$services/habit.services";

	export let habit: Habit;

	let isCompleted: boolean = habit.isCompleted;
	$: isManagingHabits = $manageHabits;

	// TODO: fix
	function toggleHabit(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.tagName === "INPUT") return;
		// toggleHabitStatus(habit.id);
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
			<Content>
				<Header>
					<Title>Delete this habit?</Title>
					<Description>
						This habit will be delete from your daily goals. You can always add it back later.
					</Description>
				</Header>
				<Footer>
					<Cancel>Cancel</Cancel>
					<Action>Delete Habit</Action>
				</Footer>
			</Content>
		{/if}
	</Root>
</li>
