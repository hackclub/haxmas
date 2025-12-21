<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/Header.svelte';
	import ProgressTracker from '$lib/ProgressTracker.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Profile | Haxmas</title>
</svelte:head>

<Header title="Profile" showBack={true} />

<div class="page-wrapper">
	<div class="container">
		<section class="section snowflakes-section">
			<div class="snowflakes-display">
				<span class="snowflakes-icon">❄️</span>
				<span class="snowflakes-count">{data.user?.snowflakes ?? 0}</span>
				<span class="snowflakes-label">Snowflakes</span>
			</div>
		</section>

		<section class="section">
			<ProgressTracker completedDays={data.projects?.length ?? 0} totalDays={12} />
		</section>

		<section class="section">
			<h2>Account Info</h2>
			<div class="info-grid">
				<div class="info-item">
					<span class="label">Name</span>
					<span class="value">{data.user?.first_name ?? ''} {data.user?.last_name ?? ''}</span>
				</div>
				<div class="info-item">
					<span class="label">Email</span>
					<span class="value">{data.user?.email ?? 'N/A'}</span>
				</div>
				{#if data.user?.slack_id}
					<div class="info-item">
						<span class="label">Slack ID</span>
						<span class="value">{data.user.slack_id}</span>
					</div>
				{/if}
				<div class="info-item">
					<span class="label">YSWS Eligible</span>
					<span class="value status" class:eligible={data.user?.ysws_eligible}>
						{data.user?.ysws_eligible ? 'Yes' : 'No'}
					</span>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Submitted Projects</h2>
			{#if !data.projects || data.projects.length === 0}
				<div class="empty-state">
					<p>No projects submitted yet.</p>
					<a href="/submit" class="submit-link">Submit your first project →</a>
				</div>
			{:else}
				<div class="projects-grid">
					{#each data.projects as project}
						<div class="project-card">
							{#if project.screenshot}
								<img src={project.screenshot} alt="Project screenshot" class="project-image" />
							{:else}
								<div class="project-image placeholder">
									<span>No Screenshot</span>
								</div>
							{/if}
							<div class="project-info">
								<span class="project-status" class:approved={project.status === 'Approved'}>
									{project.status}
								</span>
								<div class="project-links">
									{#if project.codeUrl}
										<a href={project.codeUrl} target="_blank" rel="noopener noreferrer">Code</a>
									{/if}
									{#if project.playableUrl}
										<a href={project.playableUrl} target="_blank" rel="noopener noreferrer">Demo</a>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		background-color: #4285f4;
		padding: 5rem 1.5rem 3rem;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.section {
		width: 100%;
	}

	h2 {
		color: #fff;
		font-size: 1.25rem;
		margin: 0 0 1rem 0;
		font-weight: 500;
	}

	.snowflakes-section {
		display: flex;
		justify-content: center;
	}

	.snowflakes-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 1.5rem 3rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.snowflakes-icon {
		font-size: 2rem;
	}

	.snowflakes-count {
		font-size: 3rem;
		color: #ffd700;
		font-weight: 700;
	}

	.snowflakes-label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	.info-item {
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 1rem;
	}

	.label {
		display: block;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.8rem;
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.value {
		color: #fff;
		font-size: 1rem;
		font-weight: 500;
	}

	.value.status {
		color: #ff8c37;
	}

	.value.status.eligible {
		color: #33d6a6;
	}

	.empty-state {
		text-align: center;
		padding: 2rem;
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
	}

	.empty-state p {
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0 1rem 0;
	}

	.submit-link {
		color: #5bc0de;
		text-decoration: none;
		font-weight: 500;
	}

	.submit-link:hover {
		text-decoration: underline;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.project-card {
		background: rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.2s;
	}

	.project-card:hover {
		transform: translateY(-2px);
	}

	.project-image {
		width: 100%;
		height: 140px;
		object-fit: cover;
	}

	.project-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9rem;
	}

	.project-info {
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-status {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 500;
		background: #ff8c37;
		color: #fff;
	}

	.project-status.approved {
		background: #33d6a6;
	}

	.project-links {
		display: flex;
		gap: 0.75rem;
	}

	.project-links a {
		color: #5bc0de;
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.project-links a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.page-wrapper {
			padding: 4.5rem 1rem 2rem;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.snowflakes-count {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 480px) {
		.page-wrapper {
			padding: 4rem 0.75rem 1.5rem;
		}

		.snowflakes-display {
			padding: 1rem 2rem;
		}

		.snowflakes-count {
			font-size: 2rem;
		}
	}
</style>
