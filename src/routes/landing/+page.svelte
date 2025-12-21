<script lang="ts">
	import LoginButton from '$lib/LoginButton.svelte';
	import ChristmasAnimation from '$lib/ChristmasAnimation.svelte';
</script>

<div class="landing-wrapper">
	<div class="login-header">
		<LoginButton />
	</div>
	<section class="hero-section">
		<ChristmasAnimation />

		<div class="hero-content">
			<img src="/haxmas-logo.png" alt="Haxmas" class="hero-logo" />
		</div>

		<div class="info-box">
			<p>Do workshops, get prizes! Repeat til Christmas!</p>
			<p>December 13-25, 2025</p>
		</div>
	</section>
	<section class="faq-section">
		<div class="faq-container">
			<h2 class="faq-title">FAQ</h2>

			<div class="faq-item">
				<h3>How does this work?</h3>
				<p>
					Welcome to Haxmas; 12 days of hands-on hacking! From December 13-25, a new workshop drops
					each day, created by a different member of the Hack Club community. Each workshop is only
					available on its specific day (day 1's workshop on December 13, day 2's workshop on
					December 14, and so on), so make sure to participate daily! Each workshop comes with its
					own special prize, and you'll earn snowflakes that you can redeem for stickers, swag, and
					more!
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
					You won't be able to claim that day's prize. Each workshop is only available on its
					specific day, so try to participate daily to maximize your rewards!
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
					Yes! Haxmas is a Hack Club program and completely free to participate. Find out more at <a
						href="https://hackclub.com">hackclub.com</a
					>.
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	.landing-wrapper {
		position: relative;
		overflow-x: hidden;
	}

	.landing-wrapper :global(#presents) {
		display: none;
	}

	.landing-wrapper :global(#container) {
		position: absolute;
		top: 0;
		left: 0;
	}

	.login-header {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 200;
	}

	.hero-section {
		height: 83vh;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-top: 8rem;
		box-sizing: border-box;
	}

	.hero-content {
		position: relative;
		z-index: 150;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	.info-box {
		position: relative;
		z-index: 300;
		background-color: rgba(26, 71, 42, 0.9);
		border: 2px solid #4a7c59;
		border-radius: 16px;
		padding: 2rem 3rem;
		max-width: 500px;
		width: 85%;
		text-align: center;
		margin-top: 1rem;
	}

	.info-box p {
		color: #fff;
		font-size: 1.25rem;
		line-height: 1.6;
		margin: 0 0 0.75rem 0;
		font-weight: 500;
	}

	.info-box p:last-child {
		margin-bottom: 0;
	}

	.hero-logo {
		max-width: 550px;
		width: 85%;
		height: auto;
		margin-bottom: 1rem;
	}

	@media (max-width: 768px) {
		.hero-section {
			height: auto;
			min-height: 100vh;
			min-height: 100dvh;
			padding-top: 5rem;
			padding-bottom: 2rem;
		}

		.hero-content {
			padding: 1rem;
		}

		.hero-logo {
			max-width: 280px;
		}

		.info-box {
			padding: 1.5rem;
			margin: 1rem;
			width: calc(100% - 2rem);
		}

		.info-box p {
			font-size: 1rem;
		}

		.login-header {
			top: 0.5rem;
			right: 0.5rem;
		}

		.faq-section {
			padding: 3rem 1rem;
		}

		.faq-title {
			font-size: 2rem;
		}

		.faq-item h3 {
			font-size: 1.1rem;
		}

		.faq-item p,
		.faq-item li {
			font-size: 0.95rem;
		}
	}

	@media (max-width: 480px) {
		.hero-section {
			padding-top: 4rem;
		}

		.hero-logo {
			max-width: 220px;
		}

		.info-box {
			padding: 1rem;
		}

		.info-box p {
			font-size: 0.9rem;
		}

		.faq-section {
			padding: 2rem 0.75rem;
		}

		.faq-title {
			font-size: 1.75rem;
		}
	}

	.faq-section {
		background-color: #f0f7ff;
		padding: 5rem 2rem;
		position: relative;
		z-index: 200;
	}

	.faq-container {
		max-width: 800px;
		margin: 0 auto;
	}

	.faq-title {
		font-size: 2.5rem;
		color: #000000;
		margin: 0 0 2rem 0;
		text-align: center;
	}

	.faq-item {
		margin-bottom: 2rem;
	}

	.faq-item h3 {
		font-size: 1.25rem;
		color: #000000;
		margin: 0 0 0.75rem 0;
	}

	.faq-item p {
		color: #000000;
		font-size: 1rem;
		line-height: 1.7;
		margin: 0 0 0.5rem 0;
	}

	.faq-item ul {
		color: #000000;
		margin: 0.5rem 0 0 1.5rem;
		padding: 0;
	}

	.faq-item li {
		color: #000000;
		font-size: 1rem;
		line-height: 1.7;
		margin-bottom: 0.25rem;
	}

	.faq-item a {
		color: #ec3750;
		text-decoration: none;
	}

	.faq-item a:hover {
		text-decoration: underline;
	}
</style>
