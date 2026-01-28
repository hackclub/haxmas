import { redirect, fail } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

interface ShopItemRecord {
	id: string;
	fields: {
		'Item Name': string;
	};
}

interface ShopOrderRecord {
	id: string;
	fields: {
		Name: string;
		Item?: string[];
		Email: string;
		'Address Line 1': string;
		'Address Line 2'?: string;
		City: string;
		State: string;
		Country: string;
		'Zip Code': string;
		'Phone Number': string;
		Notes?: string;
		Status?: string;
		'Shipping Information'?: string;
	};
}

interface SnowflakeRecord {
	id: string;
	fields: {
		Email?: string;
		'Snowflake Count'?: number;
	};
}

const COMPLETED_STATUSES = ['Rejected With Refund', 'Rejected Without Refund', 'Shipped'];

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/landing');
	}

	if (!locals.user.admin) {
		throw redirect(302, '/');
	}

	const [ordersResponse, itemsResponse] = await Promise.all([
		fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop%20Orders`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		}),
		fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		})
	]);

	if (!ordersResponse.ok) {
		return { orders: [], error: 'Failed to fetch orders' };
	}

	const ordersData = await ordersResponse.json();
	const itemsData = itemsResponse.ok ? await itemsResponse.json() : { records: [] };

	const itemsMap = new Map<string, string>();
	for (const item of itemsData.records as ShopItemRecord[]) {
		itemsMap.set(item.id, item.fields['Item Name']);
	}

	const orders = (ordersData.records as ShopOrderRecord[])
		.filter((order) => !COMPLETED_STATUSES.includes(order.fields.Status ?? ''))
		.map((order) => ({
			id: order.id,
			name: order.fields.Name,
			email: order.fields.Email,
			itemId: order.fields.Item?.[0] ?? null,
			itemName: order.fields.Item?.[0] ? (itemsMap.get(order.fields.Item[0]) ?? 'Unknown Item') : 'Unknown Item',
			addressLine1: order.fields['Address Line 1'],
			addressLine2: order.fields['Address Line 2'] ?? '',
			city: order.fields.City,
			state: order.fields.State,
			country: order.fields.Country,
			zipCode: order.fields['Zip Code'],
			phoneNumber: order.fields['Phone Number'],
			notes: order.fields.Notes ?? '',
			status: order.fields.Status ?? 'Pending'
		}));

	return { orders };
};

export const actions: Actions = {
	rejectWithRefund: async ({ request, locals }) => {
		if (!locals.user?.admin) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const orderId = formData.get('orderId')?.toString();
		const userEmail = formData.get('userEmail')?.toString();
		const itemId = formData.get('itemId')?.toString();

		if (!orderId || !userEmail || !itemId) {
			return fail(400, { error: 'Missing required fields' });
		}

		const itemResponse = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop/${itemId}`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		});

		let refundAmount = 0;
		if (itemResponse.ok) {
			const item = await itemResponse.json();
			const costMatch = item.fields?.Cost?.match(/^(\d+)\s+Snowflakes?$/i);
			if (costMatch) {
				refundAmount = parseInt(costMatch[1], 10);
			}
		}

		if (refundAmount > 0) {
			const snowflakeResponse = await fetch(
				`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count`,
				{
					headers: {
						Authorization: `Bearer ${AIRTABLE_API_KEY}`,
						'Content-Type': 'application/json'
					}
				}
			);

			if (snowflakeResponse.ok) {
				const snowflakeData = await snowflakeResponse.json();
				const userRecord = snowflakeData.records?.find(
					(r: SnowflakeRecord) => r.fields?.Email?.trim() === userEmail
				);

				if (userRecord) {
					const currentBalance = userRecord.fields?.['Snowflake Count'] ?? 0;
					await fetch(
						`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count/${userRecord.id}`,
						{
							method: 'PATCH',
							headers: {
								Authorization: `Bearer ${AIRTABLE_API_KEY}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								fields: {
									'Snowflake Count': currentBalance + refundAmount
								}
							})
						}
					);
				}
			}
		}

		const updateResponse = await fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop%20Orders/${orderId}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields: {
						Status: 'Rejected With Refund'
					}
				})
			}
		);

		if (!updateResponse.ok) {
			return fail(500, { error: 'Failed to update order status' });
		}

		throw redirect(302, '/admin');
	},

	rejectWithoutRefund: async ({ request, locals }) => {
		if (!locals.user?.admin) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const orderId = formData.get('orderId')?.toString();

		if (!orderId) {
			return fail(400, { error: 'Missing order ID' });
		}

		const updateResponse = await fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop%20Orders/${orderId}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields: {
						Status: 'Rejected Without Refund'
					}
				})
			}
		);

		if (!updateResponse.ok) {
			return fail(500, { error: 'Failed to update order status' });
		}

		throw redirect(302, '/admin');
	},

	markShipped: async ({ request, locals }) => {
		if (!locals.user?.admin) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const orderId = formData.get('orderId')?.toString();
		const trackingLabel = formData.get('trackingLabel')?.toString();

		if (!orderId || !trackingLabel) {
			return fail(400, { error: 'Missing required fields' });
		}

		const updateResponse = await fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop%20Orders/${orderId}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields: {
						Status: 'Shipped',
						'Shipping Information': trackingLabel
					}
				})
			}
		);

		if (!updateResponse.ok) {
			return fail(500, { error: 'Failed to update order status' });
		}

		throw redirect(302, '/admin');
	}
};
