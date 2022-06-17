<script context="module" lang="ts">
	export function textFieldError() {
		console.log('epale');
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import Icon from './Icon.svelte';

	export let label: string = 'label';
	export let id: string;
	export let value: string = '';
	export let error: string | null | undefined = undefined;
	export let focus = false;
	export let icon: [string, VoidFunction] | undefined = undefined;

	$: shrinkLabel = focus || value;
	$: {
		if (value) {
			error = '';
		}
	}

	onMount(() => {});

	function focusin() {
		focus = true;
	}

	function focusout() {
		focus = false;
	}
</script>

<m-textfield class:error>
	<label for={id} class:shrinkLabel>{label}</label>
	<input
		{id}
		type="text"
		{...$$restProps}
		bind:value
		on:focusin={focusin}
		on:focusout={focusout}
		autocomplete="off"
		{...$$restProps}
	/>
	{#if icon}
		{@const [name, onClick] = icon}
		<Icon on:click={onClick}>{name}</Icon>
	{/if}
	{#if error}
		<span class="color-error caption" in:fade={{ duration: 180, delay: 340 }}>{error}</span>
	{/if}
</m-textfield>

<style lang="scss">
	m-textfield {
		display: block;
		width: 100%;
		position: relative;
	}
	label {
		position: absolute;
		top: 14px;
		left: 16px;
		transition: 180ms ease-in;
	}
	label.shrinkLabel {
		font-size: 10px;
		top: 10px;
		font-weight: bold;
		transition: 180ms ease-out;
		color: var(--mdl-bg-color-secondary);
	}
	m-textfield :global(m-icon) {
		position: absolute;
		right: calc(48px / 2 - 24px / 2);
		top: 12px;
	}
	input {
		width: 100%;
		height: 48px;
		border-radius: 4px;
		border: 1px solid var(--mdl-border-color-input-surface);
		color: var(--mdl-parent-text-color);
		padding: 10px 16px 0 16px;
		transition: 180ms ease-in;
		background: none;
	}
	input:focus {
		border: 1px solid var(--mdl-bg-color-secondary);
		outline: none;
		transition: 180ms ease-out;
		position: sticky;
	}
	span {
		display: block;
		width: 100%;
		padding: 4px 8px;
		text-align: left;
	}
	.error {
		animation: error 340ms ease-out;
		label {
			color: var(--mdl-bg-color-error);
		}
		input {
			border: 1px solid var(--mdl-bg-color-error);
		}
	}
	@keyframes error {
		0% {
			position: relative;
			left: 0px;
		}
		20% {
			position: relative;
			left: 48px;
		}
		40% {
			position: relative;
			left: -48px;
		}
		60% {
			position: relative;
			left: 24px;
		}
		80% {
			position: relative;
			left: -24px;
		}
		90% {
			position: relative;
			left: 24px;
		}
		100% {
			position: relative;
			left: 0px;
		}
	}
</style>
