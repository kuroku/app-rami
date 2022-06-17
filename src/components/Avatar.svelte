<script lang="ts">
	export let name: string;
	export let size: string = '24px';
</script>

<i class="logo bg-primary" style="--size:{size}">{name.slice(0, 1)}</i>

<style>
	.logo {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		font-size: calc(var(--size) / 2);
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
	}
</style>
