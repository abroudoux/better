<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { toast } from "svelte-sonner";

	import {
		Root,
		Trigger,
		Content,
		Title,
		Description,
		Header,
		Footer
	} from "$lib/components/ui/dialog";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import type { HabitRequest } from "$lib/utils/types/services";
	import { postHabit } from "$lib/services/habits.services";
	import { createHabit } from "$lib/stores/habit.store";

	let newHabit: HabitRequest = { name: "" };
	let isLoading: boolean = false;

	async function handleCreateHabit() {
		isLoading = true;

		await postHabit(fetch, newHabit);

		createHabit.set(false);
		newHabit = { name: "" };

		await invalidateAll();
		await goto("/");
		toast.success("Habit(s) created successfully");
		isLoading = false;
	}
</script>

<Root bind:open={$createHabit}>
	<Trigger class={buttonVariants({ variant: "default" })} on:click={() => createHabit.set(true)}>
		Next step
	</Trigger>
	<Content class="sm:max-w-[425px]">
		<form action="POST" on:submit|preventDefault={handleCreateHabit}>
			<Header class="pb-4">
				<Title>Create a new habit</Title>
				<Description>Add a new daily challenge</Description>
			</Header>
			<div class="flex flex-col py-4 gap-6">
				<Input id="name" placeholder="Next step" class="w-full" bind:value={newHabit.name} />
				<Footer>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Creating..." : "Next step"}
					</Button>
				</Footer>
			</div>
		</form>
	</Content>
</Root>
