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
		Email?: string;
		Screenshot?: AirtableAttachment[];
		'Automation - Status'?: string;
	};
}

interface AirtableResponse {
	records: AirtableRecord[];
}

export const load: PageServerLoad = async ({ locals }) => {
	// If user is not authenticated, return 0 completed days
	if (!locals.user) {
		return { completedDays: 0 };
	}

	const filterFormula = encodeURIComponent(`{Email} = '${locals.user.email}'`);

	const response = await fetch(
		`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/YSWS%20Project%20Submission?filterByFormula=${filterFormula}`,
		{
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		}
	);

	if (!response.ok) {
		console.error('Airtable fetch failed:', response.statusText);
		return { completedDays: 0 };
	}

	const data: AirtableResponse = await response.json();

	const projects: Project[] = data.records.map((record) => ({
		id: record.id,
		codeUrl: record.fields['Code URL'] ?? null,
		playableUrl: record.fields['Playable URL'] ?? null,
		screenshot: record.fields['Screenshot']?.[0]?.url ?? null,
		status: record.fields['Automation - Status'] === '2–Submitted' ? 'Approved' : 'Pending Review'
	}));

	return { completedDays: projects.length };
};
