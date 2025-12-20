<script lang="ts">
	export let completedDays: number = 0;
	export let totalDays: number = 12;

	$: percentage = Math.round((completedDays / totalDays) * 100);

	const milestones = [
		{ days: 3, reward: 'Sticker' },
		{ days: 6, reward: 'Sticker Sheet' },
		{ days: 9, reward: 'Socks' },
		{ days: 12, reward: 'Plushie!' }
	];
</script>

<div class="progress-tracker">
	<div class="progress-header">
		<span class="progress-label">Progress</span>
		<span class="progress-count">{completedDays}/{totalDays} days</span>
	</div>

	<div class="progress-bar-container">
		<div class="progress-bar" style="width: {percentage}%"></div>

		{#each milestones as milestone}
			<div
				class="milestone"
				class:reached={completedDays >= milestone.days}
				style="left: {(milestone.days / totalDays) * 100}%"
				title="{milestone.days} days: {milestone.reward}"
			>
				<div class="milestone-dot"></div>
			</div>
		{/each}
	</div>

	<div class="milestones-legend">
		{#each milestones as milestone}
			<div class="legend-item" class:reached={completedDays >= milestone.days}>
				<span class="legend-days">{milestone.days}</span>
				<span class="legend-reward">{milestone.reward}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.progress-tracker {
		width: 100%;
		padding: 1.25rem 1.5rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.progress-label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.progress-count {
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
	}

	.progress-bar-container {
		position: relative;
		height: 12px;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 6px;
		overflow: visible;
	}

	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: linear-gradient(90deg, #33d6a6, #5bc0de);
		border-radius: 6px;
		transition: width 0.5s ease;
	}

	.milestone {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.milestone-dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.5);
		transition: all 0.3s ease;
	}

	.milestone.reached .milestone-dot {
		background: #33d6a6;
		border-color: #fff;
	}

	.milestones-legend {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.legend-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		opacity: 0.5;
		transition: opacity 0.3s;
	}

	.legend-item.reached {
		opacity: 1;
	}

	.legend-days {
		font-size: 0.85rem;
		font-weight: 600;
		color: #fff;
	}

	.legend-reward {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.7);
		text-align: center;
	}

	@media (max-width: 480px) {
		.progress-tracker {
			padding: 0.75rem 1rem;
		}

		.legend-reward {
			font-size: 0.65rem;
		}

		.milestone-dot {
			width: 12px;
			height: 12px;
		}
	}
</style>
