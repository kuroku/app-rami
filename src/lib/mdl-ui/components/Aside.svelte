<script lang="ts">
	export let direction: 'left' | 'right';
</script>

<m-aside class={direction}>
	<slot />
</m-aside>

<style>
	m-aside {
		width: 256px;
		height: 100%;
	}
	m-aside.left {
		z-index: 1;
		border-right: 1px solid;
	}
	m-aside.right {
		z-index: 3;
		border-left: 1px solid;
	}
</style>
