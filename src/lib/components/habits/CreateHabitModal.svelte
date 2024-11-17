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
	import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Textarea } from "$lib/components/ui/textarea";
	import type { HabitRequest } from "$lib/utils/types/services";
	import { postHabit } from "$lib/services/habits.services";
	import { createHabit } from "$lib/stores/habit.store";

	let newHabit: HabitRequest = { name: "" };
	let isLoading: boolean = false;
	let createMultipleHabits: boolean = false;
	let multipleHabits: string = "";

	async function handleCreateHabit() {
		isLoading = true;

		if (createMultipleHabits) {
			const habitNames = multipleHabits.split("\n").filter((line) => line.trim() !== "");
			for (const name of habitNames) {
				await postHabit(fetch, { name });
			}
		} else {
			await postHabit(fetch, newHabit);
		}

		createHabit.set(false);
		newHabit = { name: "" };
		multipleHabits = "";
		createMultipleHabits = false;

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
				{#if createMultipleHabits}
					<Textarea
						id="multipleHabits"
						placeholder="Register new habits"
						class="w-full"
						bind:value={multipleHabits}
					/>
				{:else}
					<Input id="name" placeholder="Next step" class="w-full" bind:value={newHabit.name} />
				{/if}
				<div class="flex w-full gap-2 items-center">
					<Checkbox
						id="createMultipleHabits"
						class="col-span-1"
						bind:checked={createMultipleHabits}
					/>
					<Label for="createMultipleHabits">Create multiple habits</Label>
				</div>
				<Footer>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Creating..." : "Next step"}
					</Button>
				</Footer>
			</div>
		</form>
	</Content>
</Root>
