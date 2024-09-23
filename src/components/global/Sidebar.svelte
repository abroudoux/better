<script lang="ts">
	import MenuItemSidebar from "$components/global/MenuItemSidebar.svelte";

	import { menuItemsSidebar } from "$utils/constants";
</script>

<nav class="w-1/6 h-screen p-4 flex flex-col items-start justify-start border-r">
	<ul class="w-full mt-4 flex flex-col gap-2">
		{#each menuItemsSidebar as menu}
			<MenuItemSidebar {menu} />
		{/each}
	</ul>
</nav>
