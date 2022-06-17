<script>
	import { goto } from '$app/navigation';

	import Icon from '$lib/mdl-ui/components/Icon.svelte';
	import { changeTheme, userSession } from '../stores';
	export let openLogin = false;
</script>

<Icon on:click={changeTheme}>brightness_6</Icon>
{#if $userSession}
	<i class="logo bg-secondary" on:click={() => goto('/history')}>{$userSession.name.slice(0, 1)}</i>
{:else}
	<Icon on:click={() => (openLogin = true)}>account_circle</Icon>
{/if}

<style>
	.logo {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
	}
</style>
