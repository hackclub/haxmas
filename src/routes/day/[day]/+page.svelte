<script lang="ts">
	import { marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';

	let { data } = $props();

	let markdownContent = $state('');
	let htmlContent = $state('');

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
		const res = await fetch(`https://raw.githubusercontent.com/hackclub/hackmas-day-${data.day}/refs/heads/main/README.md`);
		if (res.ok) {
			markdownContent = await res.text();
			htmlContent = await marked(markdownContent);
		}
	});
</script>

<svelte:head>
	<title>Day {data.day} | Haxmas</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />
</svelte:head>

<div class="day-wrapper">
	<div class="container">
		<a href="/" class="back-link">← Back to Home</a>
		
		<div class="markdown-content">
			{@html htmlContent}
		</div>
	</div>
</div>

<style>
	.day-wrapper {
		min-height: 100vh;
		background-color: #4285f4;
		padding: 2rem;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-block;
		color: #fff;
		text-decoration: none;
		font-size: 1rem;
		margin-bottom: 2rem;
		transition: opacity 0.2s;
	}

	.back-link:hover {
		opacity: 0.8;
		text-decoration: underline;
	}

	.markdown-content {
		background-color: rgba(26, 71, 42, 0.9);
		border: 2px solid #4a7c59;
		border-radius: 16px;
		padding: 2rem 3rem;
	}

	.markdown-content :global(h1) {
		color: #ffffff;
		font-size: 2.5rem;
		margin: 0 0 1.5rem 0;
		border-bottom: 2px solid #4a7c59;
		padding-bottom: 0.75rem;
	}

	.markdown-content :global(h2) {
		color: #ffffff;
		font-size: 1.75rem;
		margin: 2rem 0 1rem 0;
	}

	.markdown-content :global(h3) {
		color: #ffffff;
		font-size: 1.35rem;
		margin: 1.5rem 0 0.75rem 0;
	}

	.markdown-content :global(p) {
		color: #d4e7d4;
		font-size: 1rem;
		line-height: 1.7;
		margin: 0 0 1rem 0;
	}

	.markdown-content :global(a) {
		color: #ec3750;
		text-decoration: none;
	}

	.markdown-content :global(a:hover) {
		text-decoration: underline;
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
		line-height: 1.7;
		margin-bottom: 0.5rem;
	}

	.markdown-content :global(code) {
		background-color: rgba(0, 0, 0, 0.3);
		color: #33d6a6;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: monospace;
		font-size: 0.9rem;
	}

	.markdown-content :global(pre) {
		background-color: rgba(0, 0, 0, 0.4);
		border: 1px solid #4a7c59;
		border-radius: 8px;
		padding: 1rem;
		overflow-x: auto;
		margin: 0 0 1rem 0;
	}

	.markdown-content :global(pre code) {
		background-color: transparent;
		padding: 0;
	}

	.markdown-content :global(blockquote) {
		border-left: 4px solid #ec3750;
		margin: 0 0 1rem 0;
		padding-left: 1rem;
		color: #b8d4b8;
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
		border-top: 1px solid #4a7c59;
		margin: 2rem 0;
	}

	.markdown-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	.markdown-content :global(th),
	.markdown-content :global(td) {
		border: 1px solid #4a7c59;
		padding: 0.75rem;
		text-align: left;
		color: #d4e7d4;
	}

	.markdown-content :global(th) {
		background-color: rgba(0, 0, 0, 0.3);
		color: #ffffff;
	}
</style>
