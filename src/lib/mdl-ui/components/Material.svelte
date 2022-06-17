<script context="module" lang="ts">
	export interface Theme {
		type: 'light' | 'dark';
		color: 'primary' | 'secondary' | 'surface' | 'background';
	}
</script>

<script lang="ts">
	export let theme: Theme['type'] = 'light';
</script>

<svelte:head>
	{#if theme === 'dark'}
		<meta name="theme-color" content="#424242" />
	{:else}
		<meta name="theme-color" content="#fff" />
	{/if}
</svelte:head>

<m-material {theme}>
	<slot><!-- optional fallback --></slot>
</m-material>

<style lang="scss">
	:global {
		@import '../styles/theme';
		@import '../styles/typography';
		@import '../styles/elevation';
		@import '../styles/scrollbar';
		m-material * {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		m-material m-backdrop {
			width: 100%;
			height: 100%;
			background: rgba(black, 0.25);
			position: fixed;
			z-index: 99;
			top: 0;
			left: 0;
			backdrop-filter: blur(4px);
		}
		m-material hr {
			background: none;
			border: none;
			border-bottom: 1px solid var(--mdl-border-color-surface);
		}
	}
	m-material {
		display: block;
		width: 100%;
		height: 100%;
		background: var(--mdl-bg-color-background);
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		font-family: 'Roboto' !important;
		--mdl-margin-content: 8px;
		//zoom: 80%;
	}
	@media screen and (max-width: 416px) {
		m-material {
			--mdl-margin-content: 4px;
		}
	}
</style>
