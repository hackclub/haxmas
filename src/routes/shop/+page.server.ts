import { redirect } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private';
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

	const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop`, {
		headers: {
			Authorization: `Bearer ${AIRTABLE_API_KEY}`,
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		console.error('Airtable fetch failed:', response.statusText);
		return { items: [] };
	}

	const data: AirtableResponse = await response.json();

	const items: ShopItem[] = data.records
		.map((record) => ({
			id: record.id,
			name: record.fields['Item Name'],
			cost: record.fields.Cost,
			image: record.fields.Image?.[0]?.url ?? null,
			order: record.fields.Order ?? 999
		}))
		.sort((a, b) => a.order - b.order);

	return { items };
};
