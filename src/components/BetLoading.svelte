<script>
	import Card from '$lib/mdl-ui/components/Card.svelte';
	import ProgressLinear from '$lib/mdl-ui/components/ProgressLinear.svelte';
</script>

<Card id="bet-loading">
	<i />
	<i />
	<i />
</Card>

<style>
	:global(#bet-loading) {
		width: 100%;
		height: 227px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 16px;
		padding: 16px;
	}
	i {
		display: block;
		width: 100%;
		height: 48px;
		background-color: var(--mdl-bg-color-background);
	}
</style>
