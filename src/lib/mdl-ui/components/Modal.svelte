<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import ProgressLinear from './ProgressLinear.svelte';
	export let open: boolean = false;
	export let loading = false;
	export let closeWithBackdrop: boolean = true;
	function close() {
		if (closeWithBackdrop) {
			open = false;
		}
	}
</script>

{#if open}
	<dialog
		open
		class="bg-surface elevation-16"
		{...$$restProps}
		in:fly={{ duration: 180, easing: cubicOut, y: 200, delay: 180 }}
		out:fly={{ duration: 180, easing: cubicIn, y: 200 }}
	>
		<slot />
		<ProgressLinear show={loading} />
	</dialog>
	<m-backdrop
		in:fade={{ duration: 180, easing: cubicOut }}
		out:fade={{ duration: 180, easing: cubicIn, delay: 180 }}
		on:click={close}
	/>
{/if}

<style>
	dialog {
		width: calc(100% - 64px);
		max-width: 1080px;
		max-height: 480px;
		height: calc(100% - 64px);
		position: fixed;
		z-index: 100;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		border-radius: 8px;
		border: 1px solid;
		overflow: auto;
	}
	@media screen and (orientation: portrait) {
		dialog {
			min-height: 480px;
			max-height: 580px;
		}
	}
</style>
