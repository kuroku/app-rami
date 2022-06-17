<script>
	import Button from '$lib/mdl-ui/components/Button.svelte';

	import Material from '../lib/mdl-ui/components/Material.svelte';
	import { theme } from '../stores';
</script>

<Material theme={$theme}>
	<slot><!-- optional fallback --></slot>
	<Button class="fab elevation-8" rounded size="lg">Auto bet</Button>
</Material>

<style>
	:global(button.fab) {
		position: fixed !important;
		bottom: 16px;
		right: 16px;
		z-index: 60;
	}
</style>
