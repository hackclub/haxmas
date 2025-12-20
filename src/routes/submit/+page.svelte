<script lang="ts">
	import ChristmasAnimationNoPresents from '$lib/ChristmasAnimationNoPresents.svelte';
	import Header from '$lib/Header.svelte';
	import Present from '$lib/Present.svelte';
	import { CURRENT_DAY } from '../../consts';

	interface Day {
		day: number;
		url: string;
		boxColor: string;
		ribbonColor: string;
	}

	const days: Day[] = [
		{
			day: 1,
			url: 'https://forms.hackclub.com/haxmas-day-1',
			boxColor: '#c41e3a',
			ribbonColor: '#ffd700'
		},
		{
			day: 2,
			url: 'https://forms.hackclub.com/haxmas-day-2',
			boxColor: '#2e8b57',
			ribbonColor: '#f0e68c'
		},
		{
			day: 3,
			url: 'https://forms.hackclub.com/haxmas-day-3',
			boxColor: '#8b0000',
			ribbonColor: '#98fb98'
		},
		{
			day: 4,
			url: 'https://forms.hackclub.com/haxmas-day-4',
			boxColor: '#1a5f2a',
			ribbonColor: '#ffa07a'
		},
		{
			day: 5,
			url: 'https://forms.hackclub.com/haxmas-day-5',
			boxColor: '#b22222',
			ribbonColor: '#87ceeb'
		},
		{
			day: 6,
			url: 'https://forms.hackclub.com/haxmas-day-6',
			boxColor: '#228b22',
			ribbonColor: '#ffe4b5'
		},
		{
			day: 7,
			url: 'https://forms.hackclub.com/haxmas-day-7',
			boxColor: '#a52a2a',
			ribbonColor: '#dda0dd'
		},
		{ day: 8, url: '#', boxColor: '#006400', ribbonColor: '#ffb6c1' },
		{ day: 9, url: '#', boxColor: '#dc143c', ribbonColor: '#e0ffff' },
		{ day: 10, url: '#', boxColor: '#2f4f4f', ribbonColor: '#f5deb3' },
		{ day: 11, url: '#', boxColor: '#8b4513', ribbonColor: '#add8e6' },
		{ day: 12, url: '#', boxColor: '#800020', ribbonColor: '#fafad2' }
	];

	function goToDay(url: string, day: number) {
		if (day > CURRENT_DAY && day !== 4) {
			alert(`Day ${day} opens on December ${day + 12}!`);
		} else if (url === '#') {
			alert('Coming soon! Check back later.');
		} else {
			window.location.href = url;
		}
	}
</script>

<svelte:head>
	<title>Submit | Haxmas</title>
</svelte:head>

<ChristmasAnimationNoPresents />
<Header title="Submit Project" showBack={true} />

<main class="main">
	<section class="hero">
		<p class="subtitle">Choose a day to submit your project</p>
	</section>

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

	.subtitle {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.1rem;
		margin: 0;
	}

	.days-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		max-width: 600px;
		width: 100%;
		justify-items: center;
	}

	@media (max-width: 768px) {
		.main {
			padding: 4.5rem 1rem 2rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.days-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.main {
			padding: 4rem 0.75rem 1.5rem;
		}

		.subtitle {
			font-size: 0.9rem;
		}

		.days-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}
	}

	@media (max-width: 360px) {
		.days-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
