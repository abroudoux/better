<script lang="ts">
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

	let isLoading: boolean = false;
</script>

<Root>
	<Trigger class={buttonVariants({ variant: "default" })}>New training</Trigger>
	<Content class="sm:max-w-[425px]">
		<form action="POST">
			<Header>
				<Title>Create an new training</Title>
				<Description>Add a new daily challenge</Description>
			</Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input id="name" placeholder="Another step" class="col-span-3" />
				</div>
			</div>
			<Footer>
				<Button type="submit" disabled={isLoading}>{isLoading ? "Creating..." : "Next step"}</Button
				>v
			</Footer>
		</form>
	</Content>
</Root>
