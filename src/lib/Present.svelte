<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CURRENT_DAY } from '../consts';

	export let day: number;
	export let boxColor: string = '#c41e3a';
	export let ribbonColor: string = '#ffd700';

	const dispatch = createEventDispatcher();

	$: isLocked = day > CURRENT_DAY && day !== 4;
	$: isCompleted = false;

	function handleClick() {
		dispatch('click');
	}
</script>

<button
	class="present-button"
	class:locked={isLocked}
	on:click={handleClick}
	aria-label="Day {day}"
>
	<div class="present-wrapper">
		<svg viewBox="0 0 100 100" class="present-svg">
			<rect
				x="10"
				y="35"
				width="80"
				height="55"
				rx="4"
				fill={isLocked ? '#555' : boxColor}
				class="box"
			/>

			<rect
				x="10"
				y="25"
				width="80"
				height="15"
				rx="3"
				fill={isLocked ? '#444' : boxColor}
				filter="brightness(0.85)"
				class="lid"
			/>

			<rect
				x="44"
				y="25"
				width="12"
				height="65"
				fill={isLocked ? '#666' : ribbonColor}
				class="ribbon-v"
			/>
			<rect
				x="10"
				y="55"
				width="80"
				height="12"
				fill={isLocked ? '#666' : ribbonColor}
				class="ribbon-h"
			/>

			<ellipse cx="50" cy="20" rx="12" ry="8" fill={isLocked ? '#666' : ribbonColor} />
			<ellipse cx="38" cy="18" rx="8" ry="6" fill={isLocked ? '#666' : ribbonColor} />
			<ellipse cx="62" cy="18" rx="8" ry="6" fill={isLocked ? '#666' : ribbonColor} />

			{#if isLocked}
				<g transform="translate(35, 50)">
					<rect x="5" y="10" width="20" height="16" rx="2" fill="#888" />
					<path d="M10 10 V6 A5 5 0 0 1 20 6 V10" fill="none" stroke="#888" stroke-width="3" />
				</g>
			{/if}
		</svg>

		<span class="day-label" class:locked={isLocked}>Day {day}</span>
	</div>
</button>

<style>
	.present-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: transform 0.25s ease;
		outline: none;
	}

	.present-button:hover:not(.locked) {
		transform: scale(1.08) translateY(-8px);
	}

	.present-button:active:not(.locked) {
		transform: scale(1.02) translateY(-4px);
	}

	.present-button.locked {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.present-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.present-svg {
		width: 100px;
		height: 100px;
		display: block;
		filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
	}

	.day-label {
		color: #000;
		font-size: 0.9rem;
		font-weight: 600;
		text-align: center;
	}

	.day-label.locked {
		color: rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 768px) {
		.present-svg {
			width: 80px;
			height: 80px;
		}

		.day-label {
			font-size: 0.8rem;
		}

		.present-button:hover:not(.locked) {
			transform: scale(1.05) translateY(-5px);
		}
	}

	@media (max-width: 480px) {
		.present-svg {
			width: 65px;
			height: 65px;
		}

		.day-label {
			font-size: 0.75rem;
		}
	}
</style>
