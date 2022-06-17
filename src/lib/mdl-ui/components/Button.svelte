<script lang="ts">
	import type { Theme } from './Material.svelte';

	export let variant: 'bg' | 'border' | 'color' = 'bg';
	export let rounded: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'sm';
	export let color: Theme['color'] = 'primary';
	export let fullwidth: boolean = false;

	let className: string = '';

	export { className as class };
</script>

<button
	class="{variant}-{color} {className} {size}"
	class:rounded
	class:fullwidth
	{...$$restProps}
	on:click
>
	<slot>button</slot>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		padding: 0 16px !important;
		background: none;
		border: 1px solid transparent;
		border-radius: 4px;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: 180ms ease;
		&.fullwidth {
			width: 100%;
		}
		&[disabled] {
			opacity: 0.34;
			cursor: not-allowed;
		}
		&.sm {
			height: 36px;
		}
		&.md {
			height: 48px;
		}
		&.lg {
			height: 56px;
		}
		&.rounded {
			border-radius: 400px;
		}
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			background-color: var(--mdl-parent-color);
			opacity: 0;
			left: 0;
			top: 0;
			transition: 180ms ease-in;
		}
		&:hover::before {
			opacity: 0.1;
			transition: 180ms ease-out;
		}
		&:active::before {
			opacity: 0.2;
			transition: 240ms ease-out;
		}
	}
</style>
