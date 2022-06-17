<script lang="ts">
	import ModalBet from './../routes/_home/components/ModalBet.svelte';
	import Button from '$lib/mdl-ui/components/Button.svelte';
	import Card from '$lib/mdl-ui/components/Card.svelte';
	import type { MarketCatalogue } from 'src/type/bet';
	import moment from 'moment';
	import { shortName } from '../utils/shortName';
	type Status = 'WINNER' | 'LOSER' | 'ACTIVE';
	export let bet: MarketCatalogue;
	export let openLogin: boolean = false;
	export let result: boolean = false;
	let modalBet = false;
	const competitionName = bet.competition.name;
	const [homeTeam, awayTeam] = bet.runners;
	const now = new Date();
	const end = new Date(bet.marketStartTime);
	let status: Status = 'ACTIVE';
	if (result) {
		status =
			bet.status !== 'open'
				? (bet.runners.find((runner) => Number(bet.userBet.selectionId) === runner.selectionId)
						?.status as Status)
				: 'ACTIVE';
	}

	const ms = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(moment(now, 'DD/MM/YYYY HH:mm:ss'));
	const duration = moment.duration(ms);
	const s = duration.humanize();

	function colorStatus() {
		const color: Record<Status, string> = {
			WINNER: 'success',
			LOSER: 'error',
			ACTIVE: 'secondary'
		};
		if (bet.userBet) {
			if (result) {
				return bet.status !== 'OPEN' ? color[status] : 'secondary';
			}
			return 'secondary';
		} else {
			return 'surface';
		}
	}
</script>

<Card id="bet" bg={colorStatus()}>
	<p>{competitionName}</p>
	<section class="sports">
		<figure>
			<i class="logo">{shortName(homeTeam.runnerName)}</i>
			<span title={homeTeam.runnerName}>{homeTeam.runnerName}</span>
		</figure>
		<div class="content">
			<h6>vs</h6>
			<p>{result ? bet.status : s}</p>
			{#if result}
				<p>{status === 'WINNER' ? '+' : status === 'LOSER' ? '-' : ''}{bet.userBet.amount}$</p>
			{/if}
		</div>
		<figure>
			<i class="logo">{shortName(awayTeam.runnerName)}</i>
			<span title={awayTeam.runnerName}>{awayTeam.runnerName}</span>
		</figure>
	</section>
	<hr />
	<menu>
		{#if !result}
			<Button
				variant="color"
				color={bet.userBet ? 'surface' : 'secondary'}
				fullwidth
				size="md"
				on:click={() => (modalBet = true)}>{bet.userBet ? 'see more' : 'bet now'}</Button
			>
		{:else}
			<Button variant="color" color="surface" fullwidth size="md"
				>{status === 'ACTIVE' ? 'PENDING' : status}</Button
			>
		{/if}
	</menu>
</Card>

{#if !result}
	<ModalBet {bet} bind:open={modalBet} bind:openLogin on:finish />
{/if}

<style>
	:global(#bet) {
		padding: 16px;
		padding-bottom: 8px;
		display: flex;
		height: auto;
		flex-direction: column;
	}
	p {
		text-align: center;
		margin-bottom: 16px;
	}
	section {
		display: flex;
		justify-content: space-between;
		/* align-items: center; */
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 20px;
	}
	figure {
		width: 82px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
		overflow: hidden;
	}
	figure span {
		display: block;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
		margin-top: 4px;
	}
	hr {
		margin-bottom: 8px;
	}
	.logo {
		display: block;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background-color: var(--mdl-bg-color-background);
		color: var(--mdl-color-background);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
