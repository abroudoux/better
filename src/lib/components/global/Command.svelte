<script lang="ts">
	import { onMount } from "svelte";
	import Mountain from "lucide-svelte/icons/mountain";
	import Trash from "lucide-svelte/icons/trash";

	import { Dialog, Input, List, Empty, Group, Item, Separator } from "$lib/components/ui/command";

	import { manageHabits, createHabit } from "$stores/habit.store";

	let open: boolean = false;

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}

		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	});

	function handleManageHabits() {
		manageHabits.update((value: boolean) => !value);
		open = false;
	}

	function handleCreateHabit() {
		createHabit.set(true);
		open = false;
	}
</script>

<Dialog bind:open>
	<Input placeholder="Type a command or search..." />
	<List>
		<Empty>No results found.</Empty>
		<Group heading="Suggestions">
			<Item value="createHabitCmd" onSelect={handleCreateHabit}>
				<Mountain class="mr-2 h-4 w-4" />
				<span>Create new habit</span>
			</Item>
			<Item value="manageHabitsCmd" onSelect={handleManageHabits}>
				<Trash class="mr-2 h-4 w-4" />
				<span>Manage habits</span>
			</Item>
		</Group>
		<Separator />
	</List>
</Dialog>
