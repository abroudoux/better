<script lang="ts">
	import { ModeWatcher } from "mode-watcher";

	import Header from "$components/global/Header.svelte";
	import Sidebar from "$components/global/Sidebar.svelte";

	import "$styles/index.css";
</script>

<ModeWatcher />
<Header />
<main class="w-screen h-screen flex flex-row items-start justify-between">
	<Sidebar />
	<slot />
</main>
