<script>
	import Material from '../lib/mdl-ui/components/Material.svelte';
	import { theme } from '../stores';
</script>

<Material theme={$theme}>
	<slot><!-- optional fallback --></slot>
</Material>
