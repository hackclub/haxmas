<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function goBack() {
		window.location.href = '/';
	}
</script>

<div class="container">
	<h1>Profile</h1>

	<section class="section">
		<h2>Snowflakes</h2>
		<div class="snowflakes-count">{data.snowflakeCount ?? 0}</div>
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
				<span class="value">{data.user?.ysws_eligible ? 'Yes' : 'No'}</span>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Submitted Projects</h2>
		{#if data.projects.length === 0}
			<p class="empty-message">No projects submitted yet.</p>
		{:else}
			<div class="projects-grid">
				{#each data.projects as project}
					<div class="project-card">
						{#if project.screenshot}
							<img src={project.screenshot} alt="Project screenshot" class="project-image" />
						{:else}
							<div class="project-image placeholder">No Screenshot</div>
						{/if}
						<div class="project-info">
							<span class="status" class:approved={project.status === 'Approved'}>
								{project.status}
							</span>
							<div class="project-links">
								{#if project.codeUrl}
									<a href={project.codeUrl} target="_blank" rel="noopener noreferrer">View Code</a>
								{/if}
								{#if project.playableUrl}
									<a href={project.playableUrl} target="_blank" rel="noopener noreferrer">Play</a>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<button class="back-btn" on:click={goBack}>← Back</button>
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
		overflow-y: auto;
		background-color: #4285f4;
	}

	h1 {
		color: #fff;
		font-size: 3rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	h2 {
		color: #fff;
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
	}

	.section {
		width: 100%;
		max-width: 800px;
		margin-bottom: 2rem;
	}

	.snowflakes-count {
		font-size: 4rem;
		color: #f1c40f;
		font-weight: bold;
		text-align: center;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 8px;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.info-item {
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #fff;
		border-radius: 8px;
		padding: 1rem;
	}

	.label {
		display: block;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.value {
		color: #fff;
		font-size: 1.1rem;
		font-weight: 500;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.project-card {
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 8px;
		overflow: hidden;
	}

	.project-image {
		width: 100%;
		height: 150px;
		object-fit: cover;
	}

	.project-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.7);
		font-size: 1rem;
	}

	.project-info {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.status {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 600;
		background: #ff8c37;
		color: #fff;
		width: fit-content;
	}

	.status.approved {
		background: #33d6a6;
	}

	.project-links {
		display: flex;
		gap: 1rem;
		color: #fff;
	}

	.project-links a {
		color: #5bc0de;
		text-decoration: none;
		font-weight: 500;
	}

	.project-links a:hover {
		text-decoration: underline;
	}

	.empty-message {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.1rem;
		text-align: center;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #fff;
		border-radius: 8px;
	}

	.back-btn {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #fff;
		border-radius: 5px;
		color: #fff;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.2s;
	}

	.back-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.snowflakes-count {
			font-size: 3rem;
		}
	}
</style>
