<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

<style>
	:global(html, body) {
		height: 100%;
	}

	:global(body) {
		background-color: #000000;
		color: #ffffff;
		font-family: 'Roboto', Helvetica, Calibri, Arial, sans-serif;
		margin: 0;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-weight: 500;
	}

	:global(p, li) {
		font-weight: 300;
	}

	:global(strong) {
		font-weight: 500;
	}

	:global(.rainbow-glow-row) {
		position: relative;
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 0.15),
			rgba(255, 154, 0, 0.15),
			rgba(208, 222, 33, 0.15),
			rgba(79, 220, 74, 0.15),
			rgba(63, 218, 216, 0.15),
			rgba(47, 201, 226, 0.15),
			rgba(28, 127, 238, 0.15),
			rgba(95, 21, 242, 0.15),
			rgba(186, 12, 248, 0.15),
			rgba(251, 7, 217, 0.15),
			rgba(255, 0, 0, 0.15)
		);
		background-size: 200% 100%;
		animation: rainbow-gradient-rotate 4s linear infinite;
	}

	@keyframes rainbow-gradient-rotate {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}
</style>
