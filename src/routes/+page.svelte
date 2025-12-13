<script lang="ts">
	import ChristmasAnimationNoPresents from '$lib/ChristmasAnimationNoPresents.svelte';
	import Button from '$lib/Button.svelte';
	import Present from '$lib/Present.svelte';

	interface Day {
		day: number;
		url: string;
		boxColor: string;
		ribbonColor: string;
	}

	const days: Day[] = [
		{
			day: 1,
			url: '/day/1',
			boxColor: 'hsla(-150, 45%, 45%, 1)',
			ribbonColor: 'hsla(30, 45%, 70%, 0.75)'
		},
		{
			day: 2,
			url: '#',
			boxColor: 'hsla(-100, 40%, 35%, 1)',
			ribbonColor: 'hsla(80, 40%, 60%, 0.75)'
		},
		{
			day: 3,
			url: '#',
			boxColor: 'hsla(-80, 50%, 40%, 1)',
			ribbonColor: 'hsla(100, 50%, 65%, 0.75)'
		},
		{
			day: 4,
			url: '#',
			boxColor: 'hsla(-200, 42%, 38%, 1)',
			ribbonColor: 'hsla(-20, 42%, 63%, 0.75)'
		},
		{
			day: 5,
			url: '#',
			boxColor: 'hsla(-120, 48%, 42%, 1)',
			ribbonColor: 'hsla(60, 48%, 67%, 0.75)'
		},
		{
			day: 6,
			url: '#',
			boxColor: 'hsla(-180, 44%, 36%, 1)',
			ribbonColor: 'hsla(0, 44%, 61%, 0.75)'
		},
		{
			day: 7,
			url: '#',
			boxColor: 'hsla(-140, 46%, 44%, 1)',
			ribbonColor: 'hsla(40, 46%, 69%, 0.75)'
		},
		{
			day: 8,
			url: '#',
			boxColor: 'hsla(-90, 50%, 40%, 1)',
			ribbonColor: 'hsla(90, 50%, 65%, 0.75)'
		},
		{
			day: 9,
			url: '#',
			boxColor: 'hsla(-160, 43%, 37%, 1)',
			ribbonColor: 'hsla(20, 43%, 62%, 0.75)'
		},
		{
			day: 10,
			url: '#',
			boxColor: 'hsla(-110, 47%, 41%, 1)',
			ribbonColor: 'hsla(70, 47%, 66%, 0.75)'
		},
		{
			day: 11,
			url: '#',
			boxColor: 'hsla(-130, 45%, 39%, 1)',
			ribbonColor: 'hsla(50, 45%, 64%, 0.75)'
		},
		{
			day: 12,
			url: '#',
			boxColor: 'hsla(-170, 41%, 43%, 1)',
			ribbonColor: 'hsla(10, 41%, 68%, 0.75)'
		}
	];

	function goToDay(url: string) {
		if (url === '#') {
			alert('Coming soon! Check back later');
		} else {
			window.location.href = url;
		}
	}

	function goBack() {
		window.location.href = '/';
	}

	function comingSoon() {
		alert('Coming very soon!');
	}

	function goToDays() {
		window.location.href = '/submit';
	}

	function faq() {
		window.location.href = '/faq';
	}
	function credits() {
		window.location.href = '/credits';
	}
	function shop() {
		window.location.href = '/credits';
	}
</script>

<ChristmasAnimationNoPresents />

<div class="container">
	<h1>Haxmas</h1>

	<div class="days-grid">
		{#each days as day}
			<Present
				day={day.day}
				boxColor={day.boxColor}
				ribbonColor={day.ribbonColor}
				on:click={() => goToDay(day.url)}
			/>
		{/each}
	</div>

	<div class="button-container">
		<Button on:click={goToDays}>Submit</Button>
		<Button on:click={shop}>Shop</Button>
		<Button on:click={faq}>FAQ</Button>
		<Button on:click={credits}>Credits</Button>
		<Button href="/auth/logout">Log Out</Button>
	</div>
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		padding-bottom: 100px;
		overflow: hidden;
	}

	h1 {
		color: #fff;
		font-size: 3rem;
		margin-bottom: 3rem;
		text-align: center;
		padding: 0 1rem;
	}

	.days-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		max-width: 600px;
		width: 100%;
	}

	@media (max-width: 768px) {
		.days-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 480px) {
		.days-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		h1 {
			font-size: 1.75rem;
			margin-bottom: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
			padding-top: 2rem;
			padding-bottom: 120px;
		}

		h1 {
			font-size: 2rem;
			margin-bottom: 2rem;
		}

		.days-grid {
			gap: 1.25rem;
			max-width: 100%;
		}
	}

	.button-container {
		position: fixed;
		bottom: 5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		z-index: 200;
		padding: 0 0.5rem;
		max-width: 100%;
		width: calc(100% - 1rem);
	}
</style>
