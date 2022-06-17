<script>
	import Card from '$lib/mdl-ui/components/Card.svelte';
</script>

<Card id="banner">
	<section>
		<div class="content">
			<h1>Paul 2.0</h1>
			<p>
				The new, hassle-free way to bet. <a href="/#">Read more</a>
			</p>
		</div>
	</section>
	<figure>
		<img src="wallpaper-soccer.png" alt="" />
	</figure>
</Card>

<style>
	:global(#banner) {
		display: flex;
		height: 520px;
		overflow: hidden;
		grid-column: 1 / -1;
	}
	:global(#banner) section {
		width: 100%;
		height: 100%;
		/* justify-content: center; */
	}
	:global(#banner) figure {
		width: 100%;
		height: 100%;
		/* background: blue; */
	}
	:global(#banner) .content {
		max-width: 480px;
		margin-bottom: 24px;
	}
	:global(#banner) figure img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top left;
		animation: scale 10s ease-in-out infinite alternate;
		position: relative;
	}

	@media screen and (min-width: 416px) {
		:global(#banner) section {
			display: flex;
			align-items: flex-end;
			padding: 24px;
		}
		:global(#banner) .content {
			max-width: 480px;
			margin-bottom: 24px;
		}
	}
	@media screen and (max-width: 416px) {
		:global(#banner) {
			flex-direction: column;
		}
		:global(#banner) figure {
			order: -1;
			overflow: hidden;
			position: relative;
		}
		:global(#banner) figure::before {
			content: '';
			width: 100%;
			height: 80px;
			position: absolute;
			bottom: -2px;
			left: 0px;
			z-index: 2;
		}
		:global(#banner) section {
			height: 40%;
			padding: 16px;
			text-align: justify;
			/* justify-content: center; */
		}
		h1 {
			font-style: normal;
			font-weight: normal;
			font-size: 40px;
			line-height: 56px;
			text-align: center;
			margin-bottom: 16px;
		}
		:global([theme='dark'] #banner) figure::before {
			background: linear-gradient(180deg, rgba(66, 66, 66, 0) 0%, #424242 90.94%);
		}
		:global([theme='light'] #banner) figure::before {
			background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 90.94%);
		}
	}
	@keyframes scale {
		0% {
			transform: scale(1);
			left: 0;
		}
		50% {
			transform: scale(1.1);
			left: 16px;
		}
		100% {
			transform: scale(1);
			left: 0px;
		}
	}
</style>
