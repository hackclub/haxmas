<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<svelte:head>
	<title>FAQ | Haxmas</title>
</svelte:head>

<Header title="FAQ" showBack={true} />

<div class="page-wrapper">
	<div class="container">
		<div class="faq-item">
			<h3>How does this work?</h3>
			<p>
				Welcome to Haxmas; 12 days of hands-on hacking! From December 13-25, a new workshop drops
				each day, created by a different member of the Hack Club community. Each workshop is only
				available on its specific day, so make sure to participate daily! Each workshop comes with
				its own special prize, and you'll earn snowflakes that you can redeem for stickers, swag,
				and more!
			</p>
			<p>The more days you participate, the better the rewards:</p>
			<ul>
				<li><strong>Complete 3 days:</strong> Custom Haxmas sticker</li>
				<li><strong>Complete 6 days:</strong> Custom Haxmas sticker sheet</li>
				<li><strong>Complete 9 days:</strong> Hack Club socks</li>
				<li><strong>Complete all 12 days:</strong> Orpheus plushie!</li>
			</ul>
		</div>

		<div class="faq-item">
			<h3>What skill level do I need to participate?</h3>
			<p>
				No prior experience needed! Each tutorial guides you step-by-step from start to finish, so
				you can jump right in.
			</p>
		</div>

		<div class="faq-item">
			<h3>What happens if I miss a day?</h3>
			<p>
				You won't be able to claim that day's prize. Each workshop is only available on its specific
				day, so try to participate daily to maximize your rewards!
			</p>
		</div>

		<div class="faq-item">
			<h3>How long does each workshop take to complete?</h3>
			<p>Most workshops take between 1-3 hours to complete.</p>
		</div>

		<div class="faq-item">
			<h3>Can I participate if I'm new to coding?</h3>
			<p>Yes! Haxmas is designed to be beginner-friendly. No coding experience required.</p>
		</div>

		<div class="faq-item">
			<h3>Are there any requirements for participating?</h3>
			<p>You must be YSWS eligible and between ages 13-18.</p>
		</div>

		<div class="faq-item">
			<h3>Is Haxmas free?</h3>
			<p>
				Yes! Haxmas is a Hack Club program and completely free to participate. Find out more at
				<a href="https://hackclub.com" target="_blank" rel="noopener noreferrer">hackclub.com</a>.
			</p>
		</div>
	</div>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background-color: #f0f7ff;
		padding: 5rem 1.5rem 3rem;
	}

	.container {
		max-width: 700px;
		margin: 0 auto;
	}

	.faq-item {
		margin-bottom: 1.75rem;
		padding-bottom: 1.75rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	.faq-item:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.faq-item h3 {
		font-size: 1.15rem;
		color: #1a1a1a;
		margin: 0 0 0.75rem 0;
		font-weight: 600;
	}

	.faq-item p {
		color: #333;
		font-size: 1rem;
		line-height: 1.7;
		margin: 0 0 0.5rem 0;
	}

	.faq-item ul {
		color: #333;
		margin: 0.75rem 0 0 1.5rem;
		padding: 0;
	}

	.faq-item li {
		color: #333;
		font-size: 1rem;
		line-height: 1.7;
		margin-bottom: 0.35rem;
	}

	.faq-item a {
		color: #ec3750;
		text-decoration: none;
		font-weight: 500;
	}

	.faq-item a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.page-wrapper {
			padding: 4.5rem 1rem 2rem;
		}

		.faq-item h3 {
			font-size: 1.05rem;
		}

		.faq-item p,
		.faq-item li {
			font-size: 0.95rem;
		}
	}

	@media (max-width: 480px) {
		.page-wrapper {
			padding: 4rem 0.75rem 1.5rem;
		}

		.faq-item h3 {
			font-size: 1rem;
		}

		.faq-item p,
		.faq-item li {
			font-size: 0.9rem;
			line-height: 1.6;
		}
	}
</style>
