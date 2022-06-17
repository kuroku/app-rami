<script lang="ts">
	import Modal from './Modal.svelte';
	import Steps from './Steps.svelte';
	export let open = false;
	export let steps: string[];
	export let step: string = steps[0];
	function exit() {
		open = false;
	}
</script>

<Modal bind:open closeWithBackdrop={false}>
	<Steps {...$$restProps} bind:steps bind:step on:exit={exit} on:finish on:finish={exit}>
		<slot />
	</Steps>
</Modal>
