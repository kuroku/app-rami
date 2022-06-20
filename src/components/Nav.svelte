<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Button from '$lib/mdl-ui/components/Button.svelte';
	const tabs = ['home', 'history'];
	console.log($page);
	export let selectedTab: string = $page.url.pathname === '/' ? tabs[0] : tabs[1];
	function changeTab(tab: string) {
		selectedTab = tab;
		if (tab === 'home') {
			goto('/');
		} else {
			goto('/history');
		}
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
