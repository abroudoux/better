<script lang="ts">
	import MenuSidebar from "$lib/components/global/MenuSidebar.svelte";
	import { menuItemsSidebar } from "$lib/utils/constants";
</script>

<nav
	class="w-1/6 h-screen bg-background sidebar px-4 py-2 flex flex-col items-start justify-between border-r"
>
	<ul class="w-full mt-4 flex flex-col gap-2">
		{#each menuItemsSidebar as menu}
			<MenuSidebar {menu} />
		{/each}
	</ul>
	<div
		class="relative after:absolute after:bg-neutral-400 mb-12 mx-2 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
	>
		<a
			href="https://github.com/abroudoux/better.git"
			target="_blank"
			class="text-muted-foreground text-sm">Source Code</a
		>
	</div>
</nav>
