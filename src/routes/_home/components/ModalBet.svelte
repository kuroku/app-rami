<script lang="ts">
	import Button from '$lib/mdl-ui/components/Button.svelte';
	import ModalSteps from '$lib/mdl-ui/components/ModalSteps.svelte';
	import Step from '$lib/mdl-ui/components/Step.svelte';
	import Textfield from '$lib/mdl-ui/components/Textfield.svelte';
	import { slide } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { ListRunnerBook, MarketCatalogue } from 'src/type/bet';
	import { getListRunnerBookRequest } from '../../../api/bet';
	import { userSession } from '../../../stores';
	import { betRequest } from '../../../api/auth';

	export let open = false;
	export let bet: MarketCatalogue;
	export let openLogin: boolean;
	let listRunnerBook: ListRunnerBook;
	let selectionId = bet.userBet ? Number(bet.userBet.selectionId) : bet.runners[0].selectionId;
	let odd: string = bet.userBet ? String(bet.userBet.percentage) : '';
	let priceOfBet: string = bet.userBet ? String(bet.userBet.amount) : '';
	let percentageOfBet: number | undefined = bet.userBet ? bet.userBet.percentage : undefined;
	const betNames = ['visitor', 'local', 'Draw'];
	const steps = ['SELECT_RUNNER', 'ADD_FUNDS'];

	let amountBetType: 'all' | 'custom' = 'custom';

	async function getListRunnerBook(selectionId: number) {
		const { data, status } = await getListRunnerBookRequest(bet.marketId, selectionId);
		if (status) {
			listRunnerBook = data.result[0];
		}
	}

	function changeAmountBet(type: 'all' | 'custom') {
		amountBetType = type;
	}

	function changeSelectionId(id: number) {
		selectionId = id;
	}

	function onChangePriceOfBet(price: number, size: number) {
		return () => {
			if (price === percentageOfBet) {
				percentageOfBet = undefined;
				priceOfBet = '';
			} else {
				percentageOfBet = price;
				odd = `${price}`;
				priceOfBet = `${size}`;
			}
		};
	}
	async function addBet(next: VoidFunction, reject: VoidFunction) {
		if (!$userSession) {
			openLogin = true;
			return reject();
		}
		const { status } = await betRequest($userSession.tokenSession, {
			marketId: bet.marketId,
			selectionId: selectionId,
			percentage: percentageOfBet as number,
			amount: Number(priceOfBet),
			runners: bet.runners.map(({ selectionId, runnerName }) => ({ selectionId, runnerName })),
			competition: bet.competition,
			_id: bet.userBet?._id
		});
		if (status === 201) {
			next();
		} else {
			reject();
		}
	}
</script>

<ModalSteps bind:open id="modal-bet" {steps} on:finish>
	<Step id={steps[0]} next={percentageOfBet ? true : false}>
		<header>
			<h6>{bet.competition.name}</h6>
			<p>Selection your Runner</p>
		</header>
		<section>
			<p>Runners</p>
			<menu>
				{#each bet.runners as bet, key}
					<Button
						variant={selectionId === bet.selectionId ? 'bg' : 'border'}
						fullwidth
						color="secondary"
						title={bet.runnerName}
						style="order: {key === 2 ? '1' : key + 1}"
						on:click={() => changeSelectionId(bet.selectionId)}>{betNames[key]}</Button
					>
				{/each}
			</menu>
			<br />
			{#await getListRunnerBook(selectionId)}
				<p>Available to Back</p>
				<menu>
					<Button fullwidth variant="border">---</Button>
					<Button fullwidth variant="border">---</Button>
					<Button fullwidth variant="border">---</Button>
				</menu>
				<br />
				<p>Available to Lay</p>
				<menu>
					<Button fullwidth variant="border">---</Button>
					<Button fullwidth variant="border">---</Button>
					<Button fullwidth variant="border">---</Button>
				</menu>
			{:then}
				<p>Available to Back</p>
				<menu>
					{#each listRunnerBook.runners[0].ex.availableToBack as { price, size }}
						<Button
							fullwidth
							variant={price === percentageOfBet ? 'bg' : 'border'}
							color="secondary"
							title="{size}$"
							on:click={onChangePriceOfBet(price, size)}>{price}</Button
						>
					{:else}
						<Button fullwidth variant="border" disabled>N/A</Button>
						<Button fullwidth variant="border" disabled>N/A</Button>
						<Button fullwidth variant="border" disabled>N/A</Button>
					{/each}
				</menu>
				<br />
				<p>Available to Lay</p>
				<menu>
					{#each listRunnerBook.runners[0].ex.availableToLay as { price, size }}
						<Button
							fullwidth
							variant={price === percentageOfBet ? 'bg' : 'border'}
							title="{size}$"
							color="secondary"
							on:click={onChangePriceOfBet(price, size)}>{price}</Button
						>
					{:else}
						<Button fullwidth variant="border" disabled>N/A</Button>
						<Button fullwidth variant="border" disabled>N/A</Button>
						<Button fullwidth variant="border" disabled>N/A</Button>
					{/each}
				</menu>
			{/await}
		</section>
		<br />
		<span>Your balance available for betting is: 180$ <a href="/#">Add funds</a></span>
	</Step>
	<Step
		id={steps[1]}
		next={amountBetType === 'all' ? true : priceOfBet !== '' && odd !== ''}
		middleware={addBet}
	>
		<header>
			<h6>{bet.competition.name}</h6>
			<p>How much do you want to bet?</p>
		</header>
		<menu>
			<Button
				variant={amountBetType === 'custom' ? 'bg' : 'border'}
				fullwidth
				color="secondary"
				on:click={() => changeAmountBet('custom')}>custom</Button
			>
			<Button
				variant={amountBetType === 'all' ? 'bg' : 'border'}
				fullwidth
				color="secondary"
				on:click={() => changeAmountBet('all')}>all</Button
			>
		</menu>
		{#if amountBetType === 'custom'}
			<section
				in:slide={{ duration: 180, easing: cubicOut }}
				out:slide={{ duration: 180, easing: cubicIn }}
			>
				<Textfield id="odd" label="Odd" bind:value={odd} type="number" />
				<Textfield id="size" label="Size" bind:value={priceOfBet} type="number" />
			</section>
		{/if}
		<span>Your balance available for betting is: 180$ <a href="/#">Add funds</a></span>
	</Step>
</ModalSteps>

<style>
	:global(#modal-bet m-step) {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		padding: 24px;
	}
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	header h6 {
		margin-top: 16px;
	}
	menu {
		display: flex;
		gap: 8px;
	}
	span {
		display: block;
		text-align: center;
	}
</style>
