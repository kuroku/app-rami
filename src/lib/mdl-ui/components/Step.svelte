<script context="module" lang="ts">
	export interface StepProps {
		middleware: (next: VoidFunction, reject: VoidFunction) => void;
		next: boolean | null | undefined;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	export let id: string;
	export let next: StepProps['next'] = undefined;
	export let middleware: StepProps['middleware'] = (next) => {
		next();
	};
	const { index, children } = getContext('step');
	$: {
		$children[id] = { next, middleware, id };
	}
</script>

{#if id === $index}
	<m-step
		in:scale={{ duration: 180, easing: cubicOut, start: 0.95, delay: 180 }}
		out:scale={{ duration: 180, easing: cubicIn, start: 0.95 }}
		{...$$restProps}
	>
		<slot />
	</m-step>
{/if}

<style>
	m-step {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
