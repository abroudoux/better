<script lang="ts">
	import { onMount } from "svelte";
	import { ModeWatcher } from "mode-watcher";

	import Header from "$components/global/Header.svelte";
	import Sidebar from "$components/global/Sidebar.svelte";
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
