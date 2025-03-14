<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { manageHabits } from "$lib/stores/habit.store";

	$: isManagingHabits = $manageHabits;

	function handleManageHabits() {
		manageHabits.set(!isManagingHabits);
	}
</script>

<Button variant="outline" on:click={handleManageHabits}>
	{#if isManagingHabits}
		Stop Managing Habits
	{:else}
		Manage Habits
	{/if}
</Button>
