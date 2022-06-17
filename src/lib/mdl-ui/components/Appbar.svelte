<script lang="ts">
	export let title: string = 'Headline 6';
</script>

<m-appbar class="bg-surface">
	<h6>{title}</h6>
	{#if $$slots.default}
		<menu>
			<slot />
		</menu>
	{/if}
</m-appbar>

<style>
	m-appbar {
		display: flex;
		height: 56px;
		align-items: center;
		padding: 0 16px;
		border: 1px solid;
		border-radius: 4px;
		margin-bottom: var(--mdl-margin-content);
		position: sticky;
		top: -56px;
		z-index: 98;
	}
	menu {
		margin-left: auto;
		display: flex;
		gap: 24px;
	}
</style>
