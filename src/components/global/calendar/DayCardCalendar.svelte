<script lang="ts">
	import { Root, Content } from "$lib/components/ui/card";
	import { Item } from "$lib/components/ui/carousel";

	export let number: number = 1;
</script>

<Item class="md:basis-1/2 lg:basis-1/3">
	<div class="p-1">
		<Root>
			<Content class="flex aspect-square items-center justify-center p-6">
				<span class="text-3xl font-semibold">{number}</span>
			</Content>
		</Root>
	</div>
</Item>
