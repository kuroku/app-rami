<script lang="ts">
	import Appbar from './Appbar.svelte';
	export let title: string = 'Headline 6';
</script>

<m-container class="bg-background">
	<Appbar {title}>
		<slot name="appbar" />
	</Appbar>
	<m-section {...$$restProps}>
		<slot />
	</m-section>
</m-container>

<style>
	m-container {
		display: block;
		flex-grow: 1;
		height: 100%;
		overflow-y: scroll;
		position: relative;
		padding: var(--mdl-margin-content);
		padding-right: 0px;
	}
	m-section {
		display: block;
		min-height: calc(100% - 56px - var(--mdl-margin-content));
	}
</style>
