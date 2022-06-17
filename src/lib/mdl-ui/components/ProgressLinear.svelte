<script>
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let show = true;
</script>

{#if show}
	<div class="linear-activity" transition:fade={{ duration: 180, easing: cubicInOut, delay: 180 }}>
		<div class="indeterminate" />
	</div>
	<m-blockqued transition:fade={{ duration: 180, easing: cubicInOut }} />
{/if}

<style>
	.linear-activity {
		overflow: hidden;
		width: 100%;
		height: 4px;
		/* background-color: var(--mdl-parent-color); */
		position: absolute;
		z-index: 3;
	}

	.indeterminate {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.indeterminate:before {
		content: '';
		position: absolute;
		height: 100%;
		background-color: var(--mdl-bg-color-secondary);
		animation: indeterminate_first 1.5s infinite ease-out;
	}

	.indeterminate:after {
		content: '';
		position: absolute;
		height: 100%;
		background-color: var(--mdl-bg-color-secondary);
		animation: indeterminate_second 1.5s infinite ease-in;
	}

	@keyframes indeterminate_first {
		0% {
			left: -100%;
			width: 100%;
		}
		100% {
			left: 100%;
			width: 10%;
		}
	}

	@keyframes indeterminate_second {
		0% {
			left: -150%;
			width: 100%;
		}
		100% {
			left: 100%;
			width: 10%;
		}
	}
	m-blockqued {
		width: 100%;
		height: 100%;
		background-color: var(--mdl-parent-bg-color);
		opacity: 0.8;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 2;
	}
</style>
