<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<meta name="theme-color" content="#4285f4" />
	<meta
		name="description"
		content="Haxmas - 12 days of workshops, epic prizes. December 13-25, 2025. A Hack Club event."
	/>
</svelte:head>

<div class="app">
	{@render children()}
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html, body) {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background-color: #000000;
		color: #ffffff;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-weight: 600;
		line-height: 1.3;
	}

	:global(p, li) {
		font-weight: 400;
	}

	:global(strong) {
		font-weight: 600;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		font-family: inherit;
	}

	:global(::selection) {
		background: rgba(236, 55, 80, 0.3);
	}

	.app {
		min-height: 100vh;
	}
</style>
