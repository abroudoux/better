<script lang="ts">
	import { ModeWatcher } from "mode-watcher";

	import Header from "$components/global/Header.svelte";
	import Sidebar from "$components/global/Sidebar.svelte";
	import { Toaster } from "$lib/components/ui/sonner";

	import "$styles/index.css";
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
