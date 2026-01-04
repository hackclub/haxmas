<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let selectedOrder: (typeof data.orders)[0] | null = null;
	let showTrackingModal = false;
	let trackingLabel = '';

	function selectOrder(order: (typeof data.orders)[0]) {
		selectedOrder = order;
	}

	function closeDetail() {
		selectedOrder = null;
	}

	function openTrackingModal() {
		showTrackingModal = true;
		trackingLabel = '';
	}

	function closeTrackingModal() {
		showTrackingModal = false;
		trackingLabel = '';
	}

	function goBack() {
		window.location.href = '/';
	}
</script>

<div class="container">
	<h1>Order Admin</h1>

	{#if form?.error}
		<p class="error-message">{form.error}</p>
	{/if}

	{#if form?.success}
		<p class="success-message">Order updated successfully!</p>
	{/if}

	{#if selectedOrder}
		<div class="order-detail">
			<button class="close-btn" on:click={closeDetail}>← Back to Orders</button>

			<div class="detail-card">
				<h2>Order Details</h2>

				<div class="detail-row">
					<strong>Item:</strong> {selectedOrder.itemName}
				</div>
				<div class="detail-row">
					<strong>Shipping Name:</strong> {selectedOrder.name}
				</div>
				<div class="detail-row">
					<strong>Email:</strong> {selectedOrder.email}
				</div>
				<div class="detail-row">
					<strong>Phone:</strong> {selectedOrder.phoneNumber}
				</div>
				<div class="detail-row">
					<strong>Address:</strong><br />
					{selectedOrder.addressLine1}<br />
					{#if selectedOrder.addressLine2}
						{selectedOrder.addressLine2}<br />
					{/if}
					{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zipCode}<br />
					{selectedOrder.country}
				</div>
				{#if selectedOrder.notes}
					<div class="detail-row">
						<strong>Notes:</strong> {selectedOrder.notes}
					</div>
				{/if}
				<div class="detail-row">
					<strong>Status:</strong> {selectedOrder.status}
				</div>

				<div class="action-buttons">
					<form method="POST" action="?/rejectWithRefund" use:enhance>
						<input type="hidden" name="orderId" value={selectedOrder.id} />
						<input type="hidden" name="userEmail" value={selectedOrder.email} />
						<input type="hidden" name="itemId" value={selectedOrder.itemId} />
						<button type="submit" class="btn reject-refund">Reject & Refund</button>
					</form>

					<form method="POST" action="?/rejectWithoutRefund" use:enhance>
						<input type="hidden" name="orderId" value={selectedOrder.id} />
						<button type="submit" class="btn reject-no-refund">Reject (No Refund)</button>
					</form>

					<button class="btn ship" on:click={openTrackingModal}>Mark Shipped</button>
				</div>
			</div>
		</div>

		{#if showTrackingModal}
			<div class="modal-overlay" on:click={closeTrackingModal} on:keydown={(e) => e.key === 'Escape' && closeTrackingModal()} role="button" tabindex="0">
				<div class="modal" on:click|stopPropagation on:keydown|stopPropagation role="dialog" aria-modal="true" tabindex="0">
					<h3>Enter Tracking Information</h3>
					<form method="POST" action="?/markShipped" use:enhance>
						<input type="hidden" name="orderId" value={selectedOrder.id} />
						<input
							type="text"
							name="trackingLabel"
							bind:value={trackingLabel}
							placeholder="Tracking number or N/A"
							required
						/>
						<div class="modal-buttons">
							<button type="button" class="btn cancel" on:click={closeTrackingModal}>Cancel</button>
							<button type="submit" class="btn ship">Submit</button>
						</div>
					</form>
				</div>
			</div>
		{/if}
	{:else}
		<div class="orders-list">
			{#if data.orders.length === 0}
				<p class="empty-message">No pending orders to review.</p>
			{:else}
				{#each data.orders as order}
					<button class="order-card" on:click={() => selectOrder(order)}>
						<div class="order-info">
							<span class="order-item">{order.itemName}</span>
							<span class="order-customer">{order.name}</span>
							<span class="order-email">{order.email}</span>
						</div>
						<span class="order-status">{order.status}</span>
					</button>
				{/each}
			{/if}
		</div>
	{/if}

	<button class="back-btn" on:click={goBack}>← Home</button>
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
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.error-message {
		background: #ec3750;
		color: #fff;
		padding: 0.75rem 1.5rem;
		border-radius: 5px;
		margin-bottom: 1rem;
	}

	.success-message {
		background: #33d6a6;
		color: #fff;
		padding: 0.75rem 1.5rem;
		border-radius: 5px;
		margin-bottom: 1rem;
	}

	.orders-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 700px;
	}

	.order-card {
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 8px;
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		transition: background 0.2s, transform 0.2s;
		text-align: left;
		font-family: inherit;
		color: #fff;
	}

	.order-card:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.order-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.order-item {
		font-weight: bold;
		font-size: 1.1rem;
	}

	.order-customer {
		font-size: 0.95rem;
	}

	.order-email {
		font-size: 0.85rem;
		opacity: 0.8;
	}

	.order-status {
		background: rgba(255, 255, 255, 0.2);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.85rem;
	}

	.empty-message {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.2rem;
		text-align: center;
		margin-top: 2rem;
	}

	.order-detail {
		width: 100%;
		max-width: 600px;
	}

	.close-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #fff;
		border-radius: 5px;
		color: #fff;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		cursor: pointer;
		font-family: inherit;
		margin-bottom: 1rem;
		transition: background 0.2s;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.detail-card {
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 8px;
		padding: 1.5rem;
	}

	.detail-card h2 {
		color: #fff;
		margin: 0 0 1rem;
		font-size: 1.5rem;
	}

	.detail-row {
		color: #fff;
		margin-bottom: 0.75rem;
		line-height: 1.5;
	}

	.detail-row strong {
		color: #f1c40f;
	}

	.action-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
	}

	.btn {
		border: none;
		border-radius: 5px;
		color: #fff;
		padding: 0.6rem 1.2rem;
		font-size: 0.95rem;
		font-weight: bold;
		cursor: pointer;
		font-family: inherit;
		transition: opacity 0.2s;
	}

	.btn:hover {
		opacity: 0.9;
	}

	.btn.reject-refund {
		background: #ff8c37;
	}

	.btn.reject-no-refund {
		background: #ec3750;
	}

	.btn.ship {
		background: #33d6a6;
	}

	.btn.cancel {
		background: #8492a6;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 200;
	}

	.modal {
		background: #4285f4;
		border: 3px solid #fff;
		border-radius: 8px;
		padding: 1.5rem;
		width: 100%;
		max-width: 400px;
	}

	.modal h3 {
		color: #fff;
		margin: 0 0 1rem;
	}

	.modal input[type='text'] {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #fff;
		border-radius: 5px;
		font-size: 1rem;
		font-family: inherit;
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
		margin-bottom: 1rem;
		box-sizing: border-box;
	}

	.modal input[type='text']::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	.modal-buttons {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
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
</style>
