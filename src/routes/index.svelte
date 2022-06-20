<script lang="ts">
	import Section from '$lib/mdl-ui/components/Section.svelte';
	import Bet from '../components/Bet.svelte';
	import Banner from '../components/Banner.svelte';
	import ToolsUser from '../components/ToolsUser.svelte';
	import BetTypeTabs from '../components/BetTypeTabs.svelte';
	import type { MarketCatalogue } from '../type/bet';
	import { getMarketCatalogueRequest } from '../api/bet';
	import ModalLogin from './_home/components/ModalLogin.svelte';
	import ModalRegister from './_home/components/ModalRegister.svelte';
	import BetLoading from '../components/BetLoading.svelte';
	import { userSession } from '../stores';
	import Nav from '../components/Nav.svelte';
	import Button from '$lib/mdl-ui/components/Button.svelte';
	import ModalAutoBet from '../components/ModalAutoBet.svelte';
	let modalLogin = false;
	let modalRegister = false;
	let bets: MarketCatalogue[] = [];
	let loading = false;
	let selectedTab: string = 'low';

	async function getMarktCatalogue() {
		loading = true;
		const sort =
			selectedTab === 'low'
				? 'MINIMUM_AVAILABLE'
				: selectedTab === 'medium'
				? 'MAXIMUM_AVAILABLE'
				: 'FIRST_TO_START';
		const { data, status } = await getMarketCatalogueRequest(sort, $userSession?.tokenSession);
		if (status === 200) {
			bets = data.result;
		}
		loading = false;
	}

	let modalAutoBet = false;
	function openModalAutoBet() {
		modalAutoBet = true;
	}

	$: {
		if ($userSession) {
			getMarktCatalogue();
		}
	}
</script>

<svelte:head>
	<title>Paul - Home</title>
</svelte:head>

<Section id="dashboard" title="Home">
	<svelte:fragment slot="appbar">
		<ToolsUser bind:openLogin={modalLogin} />
	</svelte:fragment>
	{#if $userSession}
		<Nav />
	{/if}
	<Banner />
	<BetTypeTabs bind:selectedTab onChange={getMarktCatalogue} />
	{#await getMarktCatalogue()}
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as _, key}
			<BetLoading />
		{/each}
	{:then}
		{#if loading}
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as _, key}
				<BetLoading />
			{/each}
		{:else}
			{#each bets as bet}
				<Bet {bet} bind:openLogin={modalLogin} on:finish={() => getMarktCatalogue()} />
			{:else}
				<h6>No bet today!</h6>
			{/each}
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</Section>

{#if $userSession}
	<Button class="fab elevation-8" rounded size="lg" on:click={openModalAutoBet}>Auto bet</Button>
{/if}
<ModalLogin bind:open={modalLogin} bind:openRegister={modalRegister} />
<ModalRegister bind:open={modalRegister} bind:openLogin={modalLogin} />
<ModalAutoBet bind:open={modalAutoBet} on:finish={() => getMarktCatalogue()} />

<style>
	:global(#dashboard) {
		display: grid;
		gap: var(--mdl-margin-content);
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		align-content: flex-start;
	}
	:global(button.fab) {
		position: fixed !important;
		bottom: 16px;
		right: 16px;
		z-index: 99;
	}
</style>
