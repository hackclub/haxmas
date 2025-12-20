<script lang="ts">
	export let href: string | undefined = undefined;
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
</script>

{#if href}
	<a {href} class="btn {variant} {size}" class:disabled>
		<slot />
	</a>
{:else}
	<button class="btn {variant} {size}" {disabled} on:click>
		<slot />
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 8px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		border: 2px solid transparent;
		white-space: nowrap;
	}

	/* Sizes */
	.sm {
		padding: 0.4rem 0.8rem;
		font-size: 0.85rem;
	}

	.md {
		padding: 0.6rem 1.25rem;
		font-size: 0.95rem;
	}

	.lg {
		padding: 0.75rem 1.75rem;
		font-size: 1.1rem;
	}

	/* Variants */
	.primary {
		background-color: #ec3750;
		color: #fff;
		border-color: #ec3750;
	}

	.primary:hover:not(:disabled) {
		background-color: #d42f45;
		border-color: #d42f45;
	}

	.secondary {
		background-color: rgba(255, 255, 255, 0.15);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.3);
	}

	.secondary:hover:not(:disabled) {
		background-color: rgba(255, 255, 255, 0.25);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.outline {
		background-color: transparent;
		color: #fff;
		border-color: #fff;
	}

	.outline:hover:not(:disabled) {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.btn:disabled,
	.btn.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}

	@media (max-width: 768px) {
		.sm {
			padding: 0.35rem 0.7rem;
			font-size: 0.8rem;
		}

		.md {
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
		}

		.lg {
			padding: 0.6rem 1.25rem;
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.md {
			padding: 0.45rem 0.9rem;
			font-size: 0.85rem;
		}
	}
</style>
