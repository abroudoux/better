<script lang="ts">
	import { Root, Content } from "$lib/components/ui/card/index";
	import { Item } from "$lib/components/ui/carousel/index";

	export let name: string = "";
	export let link: string = "";
</script>

<Item class="basis-1/3">
	<a href={link} class="h-full w-full">
		<Root>
			<Content class="flex aspect-square items-center justify-center p-6 max-h-64">
				<span class="text-4xl font-semibold">{name}</span>
			</Content>
		</Root>
	</a>
</Item>
