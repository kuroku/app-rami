<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';

	import { writable, type Writable } from 'svelte/store';
	import type { StepProps } from './Step.svelte';

	import Button from './Button.svelte';
	import ProgressLinear from './ProgressLinear.svelte';
	export let steps: string[];
	export let step: string = steps[0];
	const index = writable(step);
	const dispatch = createEventDispatcher();
	let loading = false;
	let children = writable<Record<string, StepProps>>({});

	setContext<{ index: Writable<string>; children: Writable<Record<string, StepProps>> }>('step', {
		index,
		children
	});
	$: btnBack = steps.indexOf(step) === 0 ? 'exit' : 'back';
	$: {
		$index = step;
	}
	async function next() {
		const index = steps.indexOf(step);
		loading = true;
		$children[step].middleware(
			() => {
				loading = false;
				if (index !== steps.length - 1) {
					step = steps[index + 1];
				} else {
					dispatch('finish');
				}
			},
			() => {
				loading = false;
			}
		);
	}
	function back() {
		const index = steps.indexOf(step);
		if (index !== 0) {
			step = steps[index - 1];
		} else {
			dispatch('exit');
		}
	}
	$: {
		console.log($children[step]);
	}
</script>

<m-steps>
	<ProgressLinear show={loading} />
	<section {...$$restProps}>
		<slot />
	</section>
	<menu>
		<Button variant="color" color="secondary" on:click={back}>{btnBack}</Button>
		<div>
			{#each steps as _step}
				<i class:active={_step === step} />
			{/each}
		</div>
		<Button
			variant="color"
			color="secondary"
			on:click={next}
			disabled={$children[step].next === false}>next</Button
		>
	</menu>
</m-steps>

<style>
	m-steps {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	section {
		width: 100%;
		flex-grow: 1;
	}
	menu {
		display: flex;
		height: 48px;
		justify-content: space-between;
		align-items: center;
		padding: 0 8px;
	}
	menu div {
		display: flex;
		gap: 8px;
	}
	menu i {
		display: block;
		background: var(--mdl-parent-color);
		opacity: 0.25;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		transition: 180ms ease-in;
	}
	menu i.active {
		background: var(--mdl-bg-color-secondary);
		opacity: 1;
		transition: 180ms ease-in;
	}
</style>
