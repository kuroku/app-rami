<script>
	export let bg = 'surface';
	let className = '';
	export { className as class };
</script>

<m-card class="bg-{bg} {className}" {...$$restProps}>
	<slot />
</m-card>

<style>
	m-card {
		display: block;
		border: 1px solid;
		border-radius: 4px;
		height: 240px;
	}
</style>
