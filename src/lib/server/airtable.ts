import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$app/env/private';

export { AIRTABLE_API_KEY, AIRTABLE_BASE_ID };

export function escapeAirtableString(value: string): string {
	return value.replace(/'/g, "''");
}

export function buildFilterFormula(field: string, value: string): string {
	const safeValue = escapeAirtableString(value);
	return encodeURIComponent(`{${field}} = '${safeValue}'`);
}
