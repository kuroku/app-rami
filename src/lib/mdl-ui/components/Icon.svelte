<m-icon class="material-icons" {...$$restProps} on:click><slot /></m-icon>

<style lang="scss">
	m-icon {
		cursor: pointer;
		position: relative;
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			padding: 4px;
			position: absolute;
			background-color: var(--mdl-parent-color);
			opacity: 0;
			left: -4px;
			top: -4px;
			border-radius: 50%;
			transition: 180ms ease-in;
		}
		&:hover::before {
			opacity: 0.1;
			transition: 180ms ease-out;
		}
		&:active::before {
			opacity: 0.2;
			transition: 240ms ease-out;
		}
	}
</style>
