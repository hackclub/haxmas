<script lang="ts">
	import type { PageData } from './$types';
	import ChristmasAnimationNoPresents from '$lib/ChristmasAnimationNoPresents.svelte';
	import Header from '$lib/Header.svelte';
	import Button from '$lib/Button.svelte';
	import Present from '$lib/Present.svelte';
	import ProgressTracker from '$lib/ProgressTracker.svelte';
	import { CURRENT_DAY } from '../consts';

	export let data: PageData;

	interface Day {
		day: number;
		url: string;
		boxColor: string;
		ribbonColor: string;
	}

	const days: Day[] = [
		{ day: 1, url: '/day/1', boxColor: '#c41e3a', ribbonColor: '#ffd700' },
		{ day: 2, url: '/day/2', boxColor: '#2e8b57', ribbonColor: '#f0e68c' },
		{ day: 3, url: '/day/3', boxColor: '#8b0000', ribbonColor: '#98fb98' },
		{ day: 4, url: '/day/4', boxColor: '#1a5f2a', ribbonColor: '#ffa07a' },
		{ day: 5, url: '/day/5', boxColor: '#b22222', ribbonColor: '#87ceeb' },
		{ day: 6, url: '/day/6', boxColor: '#228b22', ribbonColor: '#ffe4b5' },
		{ day: 7, url: '/day/7', boxColor: '#a52a2a', ribbonColor: '#dda0dd' },
		{ day: 8, url: '/day/8', boxColor: '#006400', ribbonColor: '#ffb6c1' },
		{ day: 9, url: '/day/9', boxColor: '#dc143c', ribbonColor: '#e0ffff' },
		{ day: 10, url: '/day/10', boxColor: '#2f4f4f', ribbonColor: '#f5deb3' },
		{ day: 11, url: '/day/11', boxColor: '#8b4513', ribbonColor: '#add8e6' },
		{ day: 12, url: '/day/12', boxColor: '#800020', ribbonColor: '#fafad2' }
	];

	function goToDay(url: string, day: number) {
		if (day > CURRENT_DAY && day !== 4) {
			alert(`Day ${day} opens on December ${day + 12}!`);
		} else {
			window.location.href = url;
		}
	}
</script>

<svelte:head>
	<title>Haxmas - 12 Days of Workshops</title>
</svelte:head>

<ChristmasAnimationNoPresents />
<Header title="Haxmas" />

<main class="main">
	<section class="hero">
		<p class="tagline">12 days of workshops. Epic prizes. December 13-25.</p>
	</section>

	<section class="content">
		<ProgressTracker completedDays={data.completedDays} totalDays={12} />

		<div class="days-grid">
			{#each days as day}
				<Present
					day={day.day}
					boxColor={day.boxColor}
					ribbonColor={day.ribbonColor}
					on:click={() => goToDay(day.url, day.day)}
				/>
			{/each}
		</div>

		<nav class="quick-links">
			<Button href="/submit" variant="primary">Submit Project</Button>
			<Button href="/shop" variant="primary">Shop</Button>
			<Button href="/faq" variant="primary">FAQ</Button>
			<Button href="/credits" variant="primary">Credits</Button>
		</nav>
	</section>
</main>

<style>
	.main {
		position: relative;
		z-index: 100;
		min-height: 100vh;
		padding: 5rem 1.5rem 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero {
		text-align: center;
		margin-bottom: 2rem;
	}

	.tagline {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.1rem;
		margin: 0;
		font-weight: 400;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 700px;
	}

	.days-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		width: 100%;
		justify-items: center;
	}

	.quick-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.main {
			padding: 4.5rem 1rem 2rem;
		}

		.tagline {
			font-size: 1rem;
		}

		.days-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}

		.content {
			gap: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.main {
			padding: 4rem 0.75rem 1.5rem;
		}

		.tagline {
			font-size: 0.9rem;
		}

		.days-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}

		.quick-links {
			gap: 0.5rem;
		}
	}

	@media (max-width: 360px) {
		.days-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
