<script lang="ts">
	import ModalSteps from '$lib/mdl-ui/components/ModalSteps.svelte';
	import Step from '$lib/mdl-ui/components/Step.svelte';
	import Textfield from '$lib/mdl-ui/components/Textfield.svelte';
	import { userSession } from '../../../stores';
	import type { User } from '../../../type/user';
	import { findAuthenticationByEmailRequest, loginRequest } from '../../../api/auth';

	const steps = ['authenticate_email', 'authenticate_password'];

	export let open = false;
	export let openRegister;
	let user: User;
	let passwordType = 'password';
	let [email, errorEmail] = ['', ''];
	let [password, errorPassword] = ['', ''];

	async function findAuthenticationByEmail(next: VoidFunction, reject: VoidFunction) {
		const { data, status } = await findAuthenticationByEmailRequest(email);
		if (status === 404) {
			errorEmail = 'User not found';
			reject();
		} else if (status === 200) {
			user = data.user;
			next();
		} else {
			errorEmail = 'Error in request';
			reject();
		}
	}
	async function login(next: VoidFunction, reject: VoidFunction) {
		const { data, status } = await loginRequest(email, password);
		if (status === 200) {
			$userSession = data;
			next();
		} else if (status === 404) {
			errorPassword = 'Incorrect password';
			reject();
		}
	}

	function showPassword() {
		passwordType = passwordType === 'password' ? 'text' : 'password';
	}

	function changeToRegister() {
		openRegister = true;
		open = false;
	}
</script>

<ModalSteps id="modal-login" bind:open {steps}>
	<Step id={steps[0]} next={email !== ''} middleware={findAuthenticationByEmail}>
		<header>
			<i class="material-icons icon">account_circle</i>
			<h6>Welcome</h6>
			<p>Enter your email to continue</p>
		</header>
		<form>
			<Textfield id={'email'} label="Email" bind:value={email} bind:error={errorEmail} />
			{#if errorEmail === ''}
				<a href="/">Forgot your email??</a>
			{/if}
		</form>
		<footer>
			<span>
				Do You haven't an account? Register so you can access. It will only take a few minutes.
			</span>
			<a href="/" on:click={changeToRegister}>Create an account</a>
		</footer>
	</Step>

	<Step id={steps[1]} next={password !== ''} middleware={login}>
		<header>
			<span class="avatar">{user.name.slice(0, 1)}</span>
			<h6>Hi, {user.name}</h6>
			<p>Enter your password to continue</p>
		</header>
		<form>
			<Textfield
				id={'email'}
				label="Password"
				icon={['visibility', showPassword]}
				type={passwordType}
				bind:value={password}
				bind:error={errorPassword}
			/>
			{#if errorPassword === ''}
				<a href="/">Forgot your password??</a>
			{/if}
		</form>
		<footer>
			<span
				>Can't log in? Contact a support and specify your situation. It will only take a few
				minutes.</span
			>
			<a href="/">Send a message to support</a>
		</footer>
	</Step>
</ModalSteps>

<style lang="scss">
	:global(#modal-login m-step) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 24px;
		text-align: center;
	}
	header span,
	h6 {
		text-transform: capitalize;
	}
	header,
	form,
	footer {
		width: 100%;
		max-width: 480px;
	}
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	form a {
		display: block;
		text-align: left;
		margin-top: 12px;
	}
	.icon,
	.avatar {
		margin-bottom: 8px;
	}
	.avatar {
		display: flex;
		width: 86px;
		height: 86px;
		border-radius: 50%;
		background: var(--mdl-parent-color);
		color: var(--mdl-parent-bg-color);
		align-items: center;
		justify-content: center;
		font-size: 48px;
		font-weight: 900;
	}
	.icon {
		font-size: 92px;
	}
</style>
