import { redirect } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, buildFilterFormula } from '$lib/server/airtable';
import type { PageServerLoad } from './$types';

interface AirtableAttachment {
	id: string;
	url: string;
	filename: string;
	type: string;
	thumbnails?: {
		small: { url: string };
		large: { url: string };
	};
}

interface ShopItem {
	id: string;
	name: string;
	cost: string;
	image: string | null;
	order: number;
}

interface AirtableRecord {
	id: string;
	fields: {
		'Item Name': string;
		Cost: string;
		Image?: AirtableAttachment[];
		Order?: number;
	};
}

interface AirtableResponse {
	records: AirtableRecord[];
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/landing');
	}

	const filterFormula = buildFilterFormula('Email', locals.user.email);

	const [shopResponse, snowflakeResponse] = await Promise.all([
		fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		}),
		fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count?filterByFormula=${filterFormula}`,
			{
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		)
	]);

	if (!shopResponse.ok) {
		console.error('Airtable shop fetch failed:', shopResponse.statusText);
		return { items: [], snowflakeCount: 0 };
	}

	const data: AirtableResponse = await shopResponse.json();

	const items: ShopItem[] = data.records
		.map((record) => ({
			id: record.id,
			name: record.fields['Item Name'],
			cost: record.fields.Cost,
			image: record.fields.Image?.[0]?.url ?? null,
			order: record.fields.Order ?? 999
		}))
		.sort((a, b) => a.order - b.order);

	let snowflakeCount = 0;
	if (snowflakeResponse.ok) {
		const snowflakeData = await snowflakeResponse.json();
		const userRecord = snowflakeData.records?.[0];
		snowflakeCount = userRecord?.fields?.['Snowflake Count'] ?? 0;
	}

	return { items, snowflakeCount };
};
