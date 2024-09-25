<script lang="ts">
	import { Checkbox } from "$lib/components/ui/checkbox";

	import type { Habit } from "$utils/types/entities";

	export let habit: Habit;
</script>

<li
	class="w-full flex flex-row items-start justify-start gap-4 bg-muted-foreground/5 px-6 py-4 rounded-lg border"
>
	<Checkbox value={habit.id} />
	<div>
		<h3 class="text-sm">{habit.description}</h3>
	</div>
</li>
