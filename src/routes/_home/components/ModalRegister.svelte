<script lang="ts">
	import ModalSteps from '$lib/mdl-ui/components/ModalSteps.svelte';
	import Step from '$lib/mdl-ui/components/Step.svelte';
	import Textfield from '$lib/mdl-ui/components/Textfield.svelte';
	import { userSession } from '../../../stores';
	import type { User } from 'src/type/user';
	import { registerRequest } from '../../../api/auth';
	const steps = ['add_info_user', 'add_password'];
	export let open: boolean;
	export let openLogin: boolean;
	let [name, nameError] = ['', ''];
	let [lastname, lastnameError] = ['', ''];
	let [email, emailError] = ['', ''];
	let [password, passwordError] = ['', ''];
	let passwordType = 'password';
	function changeToLogin() {
		open = false;
		openLogin = true;
	}
	function showPassword() {
		passwordType = passwordType === 'password' ? 'text' : 'password';
	}
	async function register(next: VoidFunction, reject: VoidFunction) {
		const { data, status } = await registerRequest({ name, lastname, email, password } as User);
		if (status === 201) {
			$userSession = data;
			next();
		} else {
			reject();
		}
	}
</script>

<ModalSteps id="modal-register" bind:open {steps}>
	<Step id={steps[0]} next={name !== '' && lastname !== ''}>
		<header>
			<i class="material-icons icon">account_circle</i>
			<h6>Register</h6>
			<p>Enter your person information to continue</p>
		</header>
		<form>
			<Textfield id="name" label="Name" bind:value={name} bind:error={nameError} />
			<Textfield id="lastname" label="Lastname" bind:value={lastname} bind:error={lastnameError} />
		</form>
		<footer>
			<span>
				Do You have an account? Login so you can access. It will only take a few minutes.
			</span>
			<a href="/" on:click={changeToLogin}>Login in you account</a>
		</footer>
	</Step>
	<Step id={steps[1]} middleware={register} next={password !== '' && email !== ''}>
		<header>
			<span class="avatar">{name.slice(0, 1)}</span>
			<h6>Security</h6>
			<p>Enter your email and password to continue</p>
		</header>
		<form>
			<Textfield id="email" label="Email" bind:value={email} bind:error={emailError} />
			<Textfield
				id={'email'}
				label="Password"
				icon={['visibility', showPassword]}
				type={passwordType}
				bind:value={password}
				bind:error={passwordError}
			/>
		</form>
		<footer>
			<span>
				Do You have an account? Login so you can access. It will only take a few minutes.
			</span>
			<a href="/" on:click={changeToLogin}>Login in you account</a>
		</footer>
	</Step>
</ModalSteps>

<style>
	:global(#modal-register m-step) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 24px;
		text-align: center;
	}
	:global(m-textfield) {
		margin-bottom: 16px;
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
	.icon {
		font-size: 92px;
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
</style>
