<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/Header.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Shop | Haxmas</title>
</svelte:head>

<Header title="Shop" showBack={true} />

<div class="page-wrapper">
	<div class="container">
		<p class="subtitle">Spend your snowflakes on awesome rewards!</p>

		{#if !data.items || data.items.length === 0}
			<div class="empty-state">
				<span class="empty-icon">🛒</span>
				<p>No items available in the shop right now.</p>
				<p class="hint">Check back soon for new items!</p>
			</div>
		{:else}
			<div class="items-grid">
				{#each data.items as item}
					<div class="item-card">
						{#if item.image}
							<img src={item.image} alt={item.name} class="item-image" />
						{:else}
							<div class="item-image placeholder">
								<span>Image Coming Soon</span>
							</div>
						{/if}
						<div class="item-info">
							<h3>{item.name}</h3>
							<div class="item-cost">
								<span class="cost-icon">❄️</span>
								<span class="cost-value">{item.cost}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background-color: #4285f4;
		padding: 5rem 1.5rem 3rem;
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
	}

	.subtitle {
		text-align: center;
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.1rem;
		margin: 0 0 2rem 0;
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
	}

	.empty-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}

	.empty-state p {
		color: #fff;
		margin: 0;
		font-size: 1.1rem;
	}

	.empty-state .hint {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.95rem;
		margin-top: 0.5rem;
	}

	.items-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.item-card {
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
		transition:
			transform 0.2s,
			border-color 0.2s;
		cursor: pointer;
	}

	.item-card:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.item-image {
		width: 100%;
		height: 160px;
		object-fit: cover;
	}

	.item-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9rem;
	}

	.item-info {
		padding: 1rem;
	}

	.item-card h3 {
		color: #fff;
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 500;
	}

	.item-cost {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.cost-icon {
		font-size: 1rem;
	}

	.cost-value {
		color: #ffd700;
		font-size: 1.1rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.page-wrapper {
			padding: 4.5rem 1rem 2rem;
		}

		.items-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		.subtitle {
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.page-wrapper {
			padding: 4rem 0.75rem 1.5rem;
		}

		.items-grid {
			grid-template-columns: 1fr;
		}

		.item-image {
			height: 180px;
		}
	}
</style>
