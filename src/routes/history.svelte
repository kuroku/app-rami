<script lang="ts">
	import ToolsUser from './../components/ToolsUser.svelte';
	import Section from '$lib/mdl-ui/components/Section.svelte';
	import { getHistoryRequest } from '../api/auth';
	import { userSession } from '../stores';
	import BetLoading from '../components/BetLoading.svelte';
	import Bet from '../components/Bet.svelte';
	import type { MarketCatalogue } from '../type/bet';
	import Nav from '../components/Nav.svelte';
	let bets: MarketCatalogue[];
	async function getHistory() {
		const { data, status } = await getHistoryRequest($userSession.tokenSession);
		if (status === 200) {
			bets = data.result;
		}
	}
</script>

<Section id="dashboard" title="History">
	<svelte:fragment slot="appbar">
		<ToolsUser />
	</svelte:fragment>
	{#if $userSession}
		<Nav />
	{/if}
	{#await getHistory()}
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as _, key}
			<BetLoading />
		{/each}
	{:then}
		{#each bets as bet}
			<Bet {bet} result />
		{:else}
			<h6>You still do not have bets in progress</h6>
		{/each}
	{/await}
</Section>

<style>
	h6 {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
