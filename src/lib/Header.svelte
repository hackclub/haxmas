<script lang="ts">
	export let showBack: boolean = false;
	export let title: string = 'Haxmas';

	function goHome() {
		window.location.href = '/';
	}
</script>

<header class="header">
	<div class="header-content">
		{#if showBack}
			<button class="back-btn" on:click={goHome}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#ffffff"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="19" y1="12" x2="5" y2="12" />
					<polyline points="12 19 5 12 12 5" />
				</svg>
				<span>Back</span>
			</button>
		{:else}
			<div class="spacer"></div>
		{/if}

		<h1 class="title">{title}</h1>

		<nav class="nav">
			<a href="/profile" class="nav-link">Profile</a>
			<a href="/auth/logout" class="nav-link logout">Log Out</a>
		</nav>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 300;
		background: #4285f4;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 6px;
		color: #fff;
		padding: 0.5rem 0.75rem;
		font-size: 0.9rem;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.back-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.spacer {
		width: 80px;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #fff;
		margin: 0;
		text-align: center;
		flex: 1;
	}

	.nav {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.nav-link {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: none;
		font-size: 0.9rem;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		transition: background 0.2s;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.nav-link.logout {
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	@media (max-width: 768px) {
		.header-content {
			padding: 0.5rem 1rem;
		}

		.title {
			font-size: 1.25rem;
		}

		.back-btn span {
			display: none;
		}

		.spacer {
			width: 40px;
		}

		.nav-link {
			font-size: 0.8rem;
			padding: 0.4rem 0.6rem;
		}
	}

	@media (max-width: 480px) {
		.nav {
			gap: 0.5rem;
		}

		.nav-link {
			padding: 0.35rem 0.5rem;
			font-size: 0.75rem;
		}
	}
</style>
