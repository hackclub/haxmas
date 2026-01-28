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

interface Project {
	id: string;
	codeUrl: string | null;
	playableUrl: string | null;
	screenshot: string | null;
	status: 'Approved' | 'Pending Review';
}

interface AirtableRecord {
	id: string;
	fields: {
		'Code URL'?: string;
		'Playable URL'?: string;
		'Email'?: string;
		'Screenshot'?: AirtableAttachment[];
		'Automation - Status'?: string;
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

	const [projectsResponse, snowflakeResponse] = await Promise.all([
		fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/YSWS%20Project%20Submission?filterByFormula=${filterFormula}`,
			{
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		),
		fetch(
			`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Snowflake%20Count`,
			{
				headers: {
					Authorization: `Bearer ${AIRTABLE_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		)
	]);

	let projects: Project[] = [];
	let snowflakeCount = 0;

	if (projectsResponse.ok) {
		const data: AirtableResponse = await projectsResponse.json();
		projects = data.records.map((record) => ({
			id: record.id,
			codeUrl: record.fields['Code URL'] ?? null,
			playableUrl: record.fields['Playable URL'] ?? null,
			screenshot: record.fields['Screenshot']?.[0]?.url ?? null,
			status: record.fields['Automation - Status'] === '2–Submitted' ? 'Approved' : 'Pending Review'
		}));
	} else {
		console.error('Airtable projects fetch failed:', projectsResponse.statusText);
	}

	if (snowflakeResponse.ok) {
		const snowflakeData = await snowflakeResponse.json();
		const userRecord = snowflakeData.records?.find(
			(r: { fields?: { Email?: string } }) => r.fields?.Email?.trim() === locals.user.email
		);
		snowflakeCount = userRecord?.fields?.['Snowflake Count'] ?? 0;
	} else {
		console.error('Airtable snowflake count fetch failed:', snowflakeResponse.statusText);
	}

	return { projects, snowflakeCount };
};
