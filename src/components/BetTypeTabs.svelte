<script lang="ts">
	import Button from '$lib/mdl-ui/components/Button.svelte';
	const tabs = ['low', 'medium', 'high'];
	export let onChange: VoidFunction;
	export let selectedTab: string = tabs[0];
	function changeTab(tab: string) {
		selectedTab = tab;
		onChange();
	}
</script>

<menu class="bg-surface">
	{#each tabs as tab}
		<Button
			fullwidth
			size="md"
			variant={tab === selectedTab ? 'bg' : 'color'}
			color="secondary"
			on:click={() => changeTab(tab)}>{tab}</Button
		>
	{/each}
</menu>

<style>
	menu {
		grid-column: 1 / -1;
		width: 100%;
		height: 56px;
		border: 1px solid;
		border-radius: 4px;
		position: sticky;
		top: 0;
		z-index: 99;
		display: flex;
		gap: 4px;
		padding: 0 4px;
		align-items: center;
	}
</style>
