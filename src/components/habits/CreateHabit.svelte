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

	import type { HabitRequest } from "$utils/types/services";

	import { postHabit } from "$services/habit.services";

	let newHabit: HabitRequest = {
		name: ""
	};
	let isLoading: boolean = false;
	let isOpen: boolean = false;

	async function handleCreateHabit() {
		isLoading = true;
		const result = await postHabit(fetch, newHabit);
		console.log(result);
		isOpen = false;
		newHabit = { name: "" };

		await invalidateAll();
		await goto("/");

		toast.success("Habit created successfully");
		isLoading = false;
	}
</script>

<Root bind:open={isOpen}>
	<Trigger class={buttonVariants({ variant: "default" })}>Next step</Trigger>
	<Content class="sm:max-w-[425px]">
		<form action="POST" on:submit|preventDefault={handleCreateHabit}>
			<Header>
				<Title>Create an habit</Title>
				<Description>Add a new daily challenge</Description>
			</Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input
						id="name"
						placeholder="Another step"
						class="col-span-3"
						bind:value={newHabit.name}
					/>
				</div>
			</div>
			<Footer>
				<Button type="submit" disabled={isLoading}>{isLoading ? "Creating..." : "Next step"}</Button
				>
			</Footer>
		</form>
	</Content>
</Root>
