import { redirect, fail } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

interface AirtableAttachment {
	id: string;
	url: string;
	filename: string;
	type: string;
}

interface ShopItemRecord {
	id: string;
	fields: {
		'Item Name': string;
		Cost: string;
		Image?: AirtableAttachment[];
	};
}

interface SnowflakeRecord {
	id: string;
	fields: {
		Email?: string;
		'Snowflake Count'?: number;
	};
}

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(302, '/landing');
	}

	const [itemResponse, snowflakeResponse] = await Promise.all([
		fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop/${params.itemId}`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		}),
		fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		})
	]);

	if (!itemResponse.ok) {
		throw redirect(302, '/shop');
	}

	const item: ShopItemRecord = await itemResponse.json();

	const costMatch = item.fields.Cost.match(/^(\d+)\s+Snowflakes?$/i);
	if (!costMatch) {
		throw redirect(302, '/shop');
	}

	const cost = parseInt(costMatch[1], 10);

	let snowflakeCount = 0;
	let snowflakeRecordId: string | null = null;

	if (snowflakeResponse.ok) {
		const snowflakeData = await snowflakeResponse.json();
		const userRecord = snowflakeData.records?.find(
			(r: SnowflakeRecord) => r.fields?.Email?.trim() === locals.user.email
		);
		if (userRecord) {
			snowflakeCount = userRecord.fields?.['Snowflake Count'] ?? 0;
			snowflakeRecordId = userRecord.id;
		}
	}

	if (snowflakeCount < cost) {
		throw redirect(302, '/shop');
	}

	return {
		item: {
			id: item.id,
			name: item.fields['Item Name'],
			cost: item.fields.Cost,
			costValue: cost,
			image: item.fields.Image?.[0]?.url ?? null
		},
		email: locals.user.email,
		snowflakeCount,
		snowflakeRecordId
	};
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		if (!locals.user) {
			throw redirect(302, '/landing');
		}

		const formData = await request.formData();
		const firstName = formData.get('firstName')?.toString().trim();
		const lastName = formData.get('lastName')?.toString().trim();
		const addressLine1 = formData.get('addressLine1')?.toString().trim();
		const addressLine2 = formData.get('addressLine2')?.toString().trim() || '';
		const city = formData.get('city')?.toString().trim();
		const state = formData.get('state')?.toString().trim();
		const country = formData.get('country')?.toString().trim();
		const zipCode = formData.get('zipCode')?.toString().trim();
		const phoneNumber = formData.get('phoneNumber')?.toString().trim();
		const notes = formData.get('notes')?.toString().trim() || '';

		if (!firstName || !lastName || !addressLine1 || !city || !state || !country || !zipCode || !phoneNumber) {
			return fail(400, { error: 'Please fill in all required fields' });
		}

		const [itemResponse, snowflakeResponse] = await Promise.all([
			fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop/${params.itemId}`, {
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}),
			fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count`, {
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				}
			})
		]);

		if (!itemResponse.ok) {
			return fail(400, { error: 'Item not found' });
		}

		const item: ShopItemRecord = await itemResponse.json();

		const costMatch = item.fields.Cost.match(/^(\d+)\s+Snowflakes?$/i);
		if (!costMatch) {
			return fail(400, { error: 'This item cannot be purchased with snowflakes' });
		}

		const cost = parseInt(costMatch[1], 10);

		if (!snowflakeResponse.ok) {
			return fail(500, { error: 'Failed to verify snowflake balance' });
		}

		const snowflakeData = await snowflakeResponse.json();
		const userRecord = snowflakeData.records?.find(
			(r: SnowflakeRecord) => r.fields?.Email?.trim() === locals.user.email
		);

		if (!userRecord) {
			return fail(400, { error: 'Snowflake balance not found' });
		}

		const currentBalance = userRecord.fields?.['Snowflake Count'] ?? 0;

		if (currentBalance < cost) {
			return fail(400, { error: 'Not enough snowflakes' });
		}

		const newBalance = currentBalance - cost;
		const updateResponse = await fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count/${userRecord.id}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields: {
						'Snowflake Count': newBalance
					}
				})
			}
		);

		if (!updateResponse.ok) {
			return fail(500, { error: 'Failed to update snowflake balance' });
		}

		const orderResponse = await fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop%20Orders`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields: {
						'First Name': firstName,
						'Last Name': lastName,
						Item: [params.itemId],
						Email: locals.user.email,
						'Address Line 1': addressLine1,
						'Address Line 2': addressLine2,
						City: city,
						State: state,
						Country: country,
						'Zip Code': zipCode,
						'Phone Number': phoneNumber,
						Notes: notes
					}
				})
			}
		);

		if (!orderResponse.ok) {
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
							'Snowflake Count': currentBalance
						}
					})
				}
			);
			return fail(500, { error: 'Failed to create order' });
		}

		throw redirect(302, '/shop?success=true');
	}
};
