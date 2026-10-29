import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	AIRTABLE_API_KEY: { static: true },
	AIRTABLE_BASE_ID: { static: true },
	DATABASE_URL: { static: true },
	HACKCLUB_CLIENT_ID: { static: true },
	HACKCLUB_CLIENT_SECRET: { static: true },
	HACKCLUB_REDIRECT_URI: { static: true }
});
