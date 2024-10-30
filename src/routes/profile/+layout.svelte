<script lang="ts">
	import Section from "$components/layouts/Section.svelte";
</script>

<Section classes="w-full h-full flex flex-col gap-8">
	<h2 class="text-3xl font-semibold">Settings</h2>
	<div class="w-full flex flex-row items-start justify-between gap-8">
		<nav
			class="text-muted-foreground grid gap-4 text-sm"
			data-x-chunk-name="dashboard-04-chunk-0"
			data-x-chunk-description="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
			data-x-chunk-container="chunk-container after:right-0"
		>
			<a href="##" class="text-primary font-semibold">General</a>
			<a href="##">Security</a>
			<a href="##">Integrations</a>
			<a href="##">Support</a>
			<a href="##">Organizations</a>
			<a href="##">Advanced</a>
		</nav>
		<slot />
	</div>
</Section>
