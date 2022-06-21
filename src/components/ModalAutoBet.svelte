<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/mdl-ui/components/Button.svelte';

	import Modal from '$lib/mdl-ui/components/Modal.svelte';
	import Textfield from '$lib/mdl-ui/components/Textfield.svelte';
	import { postAutoBetRequest } from '../api/auth';
	import { userSession } from '../stores';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const typeBets = ['low', 'medium', 'high'];
	const typePrices = ['custom', 'all'];
	export let open = false;
	let loading = false;
	let typeBetSelect = 'low';
	let typePriceSelect = 'custom';
	let odd = '';
	let price = '';

	const dispatch = createEventDispatcher();

	function changeTypeBet(type: string) {
		return () => {
			typeBetSelect = type;
		};
	}

	function changeTypePrice(type: string) {
		return () => {
			typePriceSelect = type;
		};
	}

	async function onSubmit() {
		loading = true;
		const { data, status } = await postAutoBetRequest($userSession.tokenSession, {
			amount: Number(price),
			typeBet: typeBetSelect
		});
		if (status === 201) {
			open = false;
			if (data.length === 0) {
				alert('No bets found');
			}
			dispatch('finish');
		} else {
			alert('An error has occurred');
		}
		loading = false;
	}

	// your script goes here
</script>

<Modal bind:open id="modal-auto-bet" {loading}>
	<section>
		<header>
			<h6>let's Start your auto bet</h6>
			<p>What is your level of risk in the bet?</p>
		</header>
		<div class="form">
			<p>Risk of the bet</p>
			<menu>
				{#each typeBets as typeBet}
					<Button
						variant={typeBetSelect === typeBet ? 'bg' : 'border'}
						color="secondary"
						fullwidth
						on:click={changeTypeBet(typeBet)}>{typeBet}</Button
					>
				{/each}
			</menu>
			<br />
			<p>Bet price</p>
			<menu>
				{#each typePrices as typePrice}
					<Button
						fullwidth
						color="secondary"
						variant={typePriceSelect === typePrice ? 'bg' : 'border'}
						on:click={changeTypePrice(typePrice)}>{typePrice}</Button
					>
				{/each}
			</menu>
			<br />
			{#if typePriceSelect === 'custom'}
				<form
					in:slide={{ duration: 180, easing: cubicOut }}
					out:slide={{ duration: 180, easing: cubicIn }}
				>
					<Textfield id="odd" label="odd" bind:value={odd} type="number" />
					<Textfield id="price" label="price" bind:value={price} type="number" />
				</form>
			{/if}
		</div>

		<span>Your balance available for betting is: 180$ <a href="/#">Add funds</a></span>
	</section>
	<menu>
		<Button variant="color" color="secondary" on:click={() => (open = false)}>cancel</Button>
		<Button variant="bg" color="secondary" on:click={onSubmit}>Start</Button>
	</menu>
</Modal>

<style>
	:global(#modal-auto-bet) {
		display: flex;
		flex-direction: column;
	}
	section header,
	section menu {
		display: flex;
	}
	section header {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	section menu {
		gap: 8px;
	}
	span {
		text-align: center;
	}
	section {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: space-evenly;
		padding: 24px;
	}
	:global(#modal-auto-bet) > menu {
		display: flex;
		height: 48px;
		justify-content: flex-end;
		align-items: center;
		padding: 8px;
	}
</style>
