<script lang="ts">
	import { page } from "$app/stores";

	import type { MenuItemSidebar } from "$utils/types/interfaces";

	export let menu: MenuItemSidebar;

	$: isActive = $page.url.pathname === menu.url;
</script>

<li
	class="text-primary hover:text-primary rounded-lg px-3 py-2 transition-all {isActive
		? 'bg-muted'
		: ''}"
>
	<a href={menu.url} class="w-full h-full flex items-center gap-3">
		<svelte:component this={menu.icon} class="w-4 h-4" />
		{menu.label}
	</a>
</li>
