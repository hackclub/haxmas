<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let submitting = false;
</script>

<div class="container">
	<h1>Order: {data.item.name}</h1>

	<div class="order-layout">
		<div class="item-preview">
			{#if data.item.image}
				<img src={data.item.image} alt={data.item.name} class="item-image" />
			{:else}
				<div class="item-image placeholder">Image Coming Soon</div>
			{/if}
			<p class="item-cost">{data.item.cost}</p>
			<p class="balance">Your balance: {data.snowflakeCount} Snowflakes</p>
			<p class="remaining">After purchase: {data.snowflakeCount - data.item.costValue} Snowflakes</p>
		</div>

		<form
			method="POST"
			class="order-form"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update();
				};
			}}
		>
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}

			<label>
				<span>First Name *</span>
				<input type="text" name="firstName" required />
			</label>

			<label>
				<span>Last Name *</span>
				<input type="text" name="lastName" required />
			</label>

			<label>
				<span>Email</span>
				<input type="email" value={data.email} disabled />
			</label>

			<label>
				<span>Phone Number *</span>
				<input type="tel" name="phoneNumber" required />
			</label>

			<label>
				<span>Address Line 1 *</span>
				<input type="text" name="addressLine1" required />
			</label>

			<label>
				<span>Address Line 2</span>
				<input type="text" name="addressLine2" />
			</label>

			<div class="row">
				<label class="flex-1">
					<span>City *</span>
					<input type="text" name="city" required />
				</label>

				<label class="flex-1">
					<span>State/Province *</span>
					<input type="text" name="state" required />
				</label>
			</div>

			<div class="row">
				<label class="flex-1">
					<span>Country *</span>
					<input type="text" name="country" required />
				</label>

				<label class="flex-1">
					<span>Zip/Postal Code *</span>
					<input type="text" name="zipCode" required />
				</label>
			</div>

			<label>
				<span>Additional Notes</span>
				<textarea name="notes" rows="3" placeholder="Any special instructions or notes..."></textarea>
			</label>

			<button type="submit" class="submit-btn" disabled={submitting}>
				{submitting ? 'Processing...' : `Purchase for ${data.item.cost}`}
			</button>
		</form>
	</div>

	<a href="/shop" class="back-link">← Back to Shop</a>
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
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.order-layout {
		display: flex;
		gap: 3rem;
		max-width: 900px;
		width: 100%;
	}

	@media (max-width: 700px) {
		.order-layout {
			flex-direction: column;
			gap: 2rem;
		}
	}

	.item-preview {
		flex: 0 0 250px;
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 8px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: fit-content;
	}

	.item-image {
		width: 100%;
		height: 180px;
		object-fit: cover;
		border-radius: 6px;
	}

	.item-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.7);
		font-size: 1rem;
	}

	.item-cost {
		color: #f1c40f;
		font-size: 1.3rem;
		font-weight: bold;
		margin: 1rem 0 0.5rem;
	}

	.balance, .remaining {
		color: rgba(255, 255, 255, 0.8);
		margin: 0.25rem 0;
		font-size: 0.9rem;
	}

	.remaining {
		color: #33d6a6;
	}

	.order-form {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label span {
		color: #fff;
		font-size: 0.9rem;
	}

	input {
		padding: 0.75rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
		font-size: 1rem;
		font-family: inherit;
	}

	input:focus {
		outline: none;
		border-color: #fff;
		background: rgba(255, 255, 255, 0.15);
	}

	input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	textarea {
		padding: 0.75rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
		font-size: 1rem;
		font-family: inherit;
		resize: vertical;
	}

	textarea:focus {
		outline: none;
		border-color: #fff;
		background: rgba(255, 255, 255, 0.15);
	}

	.row {
		display: flex;
		gap: 1rem;
	}

	.flex-1 {
		flex: 1;
	}

	.error {
		background: #ec3750;
		color: #fff;
		padding: 0.75rem;
		border-radius: 5px;
		margin: 0;
	}

	.submit-btn {
		margin-top: 1rem;
		background: #33d6a6;
		border: none;
		border-radius: 5px;
		color: #fff;
		padding: 1rem 2rem;
		font-size: 1.1rem;
		font-weight: bold;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.2s;
	}

	.submit-btn:hover:not(:disabled) {
		background: #2ab890;
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.back-link {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #fff;
		border-radius: 5px;
		color: #fff;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		text-decoration: none;
		transition: background 0.2s;
	}

	.back-link:hover {
		background: rgba(255, 255, 255, 0.2);
	}
</style>
