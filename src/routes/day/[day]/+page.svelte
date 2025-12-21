<script lang="ts">
	import { marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';
	import { CURRENT_DAY } from '../../../consts';
	import Header from '$lib/Header.svelte';
	import Button from '$lib/Button.svelte';

	type PageProps = {
		data: {
			day: string;
		};
	};

	let { data }: PageProps = $props();

	let markdownContent = $state('');
	let htmlContent = $state('');
	let isClosed = $state(false);
	let isLoading = $state(true);

	function isDayClosed(day: number): boolean {
		const openDateEST = new Date(`2025-12-${day + 12}T00:00:00-05:00`);
		const closeDateEST = new Date(openDateEST.getTime() + 24 * 60 * 60 * 1000);
		return new Date() > closeDateEST;
	}

	marked.use(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	onMount(async () => {
		const day = parseInt(data.day, 10);
		if (day < 1 || day > 12 || isNaN(day) || !Number.isInteger(day)) {
			htmlContent = '<h1>Invalid day</h1><p>Please select a day between 1 and 12.</p>';
			isLoading = false;
			return;
		}
		if (day > CURRENT_DAY && day !== 4) {
			htmlContent = `<h1>Day ${day} is not available yet</h1><p>Come back on December ${day + 12} to see the content!</p>`;
			isLoading = false;
			return;
		}
		const repo = day === 9 ? 'jeninh' : 'hackclub';
		const res = await fetch(
			`https://raw.githubusercontent.com/${repo}/hackmas-day-${day}/refs/heads/main/README.md`
		);
		if (res.ok) {
			markdownContent = await res.text();
			htmlContent = await marked(markdownContent);
			isClosed = isDayClosed(day);
		}
		isLoading = false;
	});
</script>

<svelte:head>
	<title>Day {data.day} | Haxmas</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
	/>
</svelte:head>

<Header title="Day {data.day}" showBack={true} />

<div class="page-wrapper">
	<div class="container">
		{#if isLoading}
			<div class="loading">
				<div class="spinner"></div>
				<p>Loading workshop...</p>
			</div>
		{:else}
			{#if isClosed}
				<div class="status-banner closed">
					⚠️ This day is closed and no longer accepting submissions
				</div>
			{/if}

			<article class="markdown-content">
				{@html htmlContent}
			</article>

			<div class="action-bar">
				<Button href="https://forms.hackclub.com/haxmas-day-{data.day}" variant="primary" size="lg">
					Submit Your Project
				</Button>
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
		max-width: 800px;
		margin: 0 auto;
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		color: #fff;
		gap: 1rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top-color: #fff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.status-banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
		font-weight: 500;
	}

	.status-banner.closed {
		background-color: rgba(236, 55, 80, 0.9);
		color: #fff;
	}

	.markdown-content {
		background-color: rgba(26, 71, 42, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 2rem 2.5rem;
	}

	.markdown-content :global(h1) {
		color: #ffffff;
		font-size: 2rem;
		margin: 0 0 1.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
		padding-bottom: 0.75rem;
	}

	.markdown-content :global(h2) {
		color: #ffffff;
		font-size: 1.5rem;
		margin: 2rem 0 1rem 0;
	}

	.markdown-content :global(h3) {
		color: #ffffff;
		font-size: 1.25rem;
		margin: 1.5rem 0 0.75rem 0;
	}

	.markdown-content :global(p) {
		color: #d4e7d4;
		font-size: 1rem;
		line-height: 1.75;
		margin: 0 0 1rem 0;
	}

	.markdown-content :global(a) {
		color: #5bc0de;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	.markdown-content :global(a:hover) {
		border-bottom-color: currentColor;
	}

	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		color: #d4e7d4;
		margin: 0 0 1rem 1.5rem;
		padding: 0;
	}

	.markdown-content :global(li) {
		color: #d4e7d4;
		font-size: 1rem;
		line-height: 1.75;
		margin-bottom: 0.5rem;
	}

	.markdown-content :global(code) {
		background-color: rgba(0, 0, 0, 0.3);
		color: #33d6a6;
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		font-family: 'SF Mono', Monaco, Consolas, monospace;
		font-size: 0.9em;
	}

	.markdown-content :global(pre) {
		background-color: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 1rem;
		overflow-x: auto;
		margin: 0 0 1rem 0;
	}

	.markdown-content :global(pre code) {
		background-color: transparent;
		padding: 0;
		font-size: 0.875rem;
	}

	.markdown-content :global(blockquote) {
		border-left: 3px solid #5bc0de;
		margin: 0 0 1rem 0;
		padding-left: 1rem;
		color: rgba(212, 231, 212, 0.85);
		font-style: italic;
	}

	.markdown-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		margin: 1rem 0;
	}

	.markdown-content :global(hr) {
		border: none;
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		margin: 2rem 0;
	}

	.markdown-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	.markdown-content :global(th),
	.markdown-content :global(td) {
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 0.75rem;
		text-align: left;
		color: #d4e7d4;
	}

	.markdown-content :global(th) {
		background-color: rgba(0, 0, 0, 0.2);
		color: #ffffff;
	}

	.action-bar {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.page-wrapper {
			padding: 4.5rem 1rem 2rem;
		}

		.markdown-content {
			padding: 1.5rem;
			border-radius: 10px;
		}

		.markdown-content :global(h1) {
			font-size: 1.5rem;
		}

		.markdown-content :global(h2) {
			font-size: 1.25rem;
		}

		.markdown-content :global(h3) {
			font-size: 1.1rem;
		}

		.markdown-content :global(p),
		.markdown-content :global(li) {
			font-size: 0.95rem;
		}

		.status-banner {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		.page-wrapper {
			padding: 4rem 0.75rem 1.5rem;
		}

		.markdown-content {
			padding: 1.25rem;
		}

		.markdown-content :global(h1) {
			font-size: 1.35rem;
		}

		.markdown-content :global(pre) {
			padding: 0.75rem;
			font-size: 0.8rem;
		}

		.status-banner {
			font-size: 0.85rem;
			padding: 0.75rem 1rem;
		}
	}
</style>
