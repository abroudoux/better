<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { toast } from "svelte-sonner";

	import {
		Content,
		Header,
		Footer,
		Cancel,
		Action,
		Title,
		Description
	} from "$lib/components/ui/alert-dialog";

	import type { Habit } from "$utils/types/entities";
	import { deleteHabit } from "$services/habit.services";

	export let habit: Habit;

	let isLoading: boolean = false;

	async function handleDeleteHabit() {
		isLoading = true;
		const result = await deleteHabit(fetch, habit.id);
		console.log(result);

		await invalidateAll();
		await goto("/");

		toast.success("Habit deleted successfully");

		isLoading = true;
	}
</script>

<Content>
	<form action="POST" on:submit|preventDefault={handleDeleteHabit}>
		<Header>
			<Title>Delete this habit?</Title>
			<Description>
				This habit will be delete from your daily goals. You can always add it back later.
			</Description>
		</Header>
		<Footer>
			<Cancel>Cancel</Cancel>
			<Action type="submit" disabled={isLoading}>{isLoading ? "Deleting.." : "Delete"}</Action>
		</Footer>
	</form>
</Content>
