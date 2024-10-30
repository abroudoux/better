<script lang="ts">
	import clsx from "clsx";

	export let classes: string = "";
</script>

<section class={clsx("w-full h-full p-8", classes)}>
	<slot />
</section>
