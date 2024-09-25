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
</script>

<Root>
	<Trigger class={buttonVariants({ variant: "default" })}>Create habit</Trigger>
	<Content class="sm:max-w-[425px]">
		<Header>
			<Title>Create an habit</Title>
			<Description>Add a new daily challenge</Description>
		</Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" placeholder="Another step" class="col-span-3" />
			</div>
		</div>
		<Footer>
			<Button type="submit">Create habit</Button>
		</Footer>
	</Content>
</Root>
