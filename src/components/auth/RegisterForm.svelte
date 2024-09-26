<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import { toast } from "svelte-sonner";

	import { Button } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
	import { Label } from "$lib/components/ui/label/index";

	let isLoading: boolean = false;
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<form class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Register</h1>
				<p class="text-muted-foreground text-balance">Start your journey with us today</p>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="firstName">First Name</Label>
					<Input id="firstName" type="firstName" placeholder="John" required />
				</div>
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input id="name" type="name" placeholder="Doe" required />
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" disabled={isLoading} class="w-full"
					>{isLoading ? "Creating..." : "Create account"}</Button
				>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="##" class="underline">Log in</a>
			</div>
		</form>
	</div>
	<div class="bg-muted hidden lg:block rounded">
		<img
			src="https://source.unsplash.com/1920x1080/?nature,water"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover rounded dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
