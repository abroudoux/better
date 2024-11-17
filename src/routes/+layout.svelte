<script lang="ts">
	import { onMount } from "svelte";
	import { ModeWatcher } from "mode-watcher";

	import Header from "$lib/components/global/Header.svelte";
	import Sidebar from "$lib/components/global/Sidebar.svelte";
	import Command from "$lib/components/global/Command.svelte";
	import { Toaster } from "$lib/components/ui/sonner";

	import { manageDay } from "$utils/days";

	import "$styles/index.css";

	onMount(() => {
		manageDay();
	});
</script>

<ModeWatcher />

<div class="layout">
	<Header />
	<Sidebar />
	<main class="main">
		<slot />
	</main>
</div>

<Toaster />
<Command />
