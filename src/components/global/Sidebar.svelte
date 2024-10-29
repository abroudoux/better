<script lang="ts">
	import MenuItemSidebar from "$components/global/MenuItemSidebar.svelte";

	import { menuItemsSidebar } from "$utils/constants";
</script>

<nav
	class="w-1/6 h-screen bg-background sidebar px-4 py-2 flex flex-col items-start justify-between border-r"
>
	<ul class="w-full mt-4 flex flex-col gap-2">
		{#each menuItemsSidebar as menu}
			<MenuItemSidebar {menu} />
		{/each}
	</ul>
	<a
		href="https://github.com/abroudoux/better.git"
		target="_blank"
		class="w-full items-center flex justify-start pb-8 px-2 text-muted-foreground underline underline-offset-4 hover:underline-offset-2 transition-all text-sm"
		>Source Code</a
	>
</nav>
