import {
	HACKCLUB_CLIENT_ID,
	HACKCLUB_CLIENT_SECRET,
	HACKCLUB_REDIRECT_URI
} from '$app/env/private';

const AUTHORIZE_URL = 'https://auth.hackclub.com/oauth/authorize';
const TOKEN_URL = 'https://auth.hackclub.com/oauth/token';
const USER_URL = 'https://auth.hackclub.com/api/v1/me';

const SCOPES = ['email', 'name', 'slack_id', 'verification_status'].join(' ');

export function getAuthorizationUrl(state: string): string {
	const params = new URLSearchParams({
		client_id: HACKCLUB_CLIENT_ID,
		redirect_uri: HACKCLUB_REDIRECT_URI,
		response_type: 'code',
		scope: SCOPES,
		state
	});

	return `${AUTHORIZE_URL}?${params.toString()}`;
}

interface TokenResponse {
	access_token: string;
}

export async function exchangeCodeForToken(code: string): Promise<string> {
	const params = new URLSearchParams({
		client_id: HACKCLUB_CLIENT_ID,
		client_secret: HACKCLUB_CLIENT_SECRET,
		redirect_uri: HACKCLUB_REDIRECT_URI,
		code,
		grant_type: 'authorization_code'
	});

	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params.toString()
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to exchange code for token: ${error}`);
	}

	const data: TokenResponse = await response.json();
	return data.access_token;
}

export interface HackClubIdentity {
	id: string;
	ysws_eligible: boolean;
	verification_status: string;
	first_name: string;
	last_name: string;
	primary_email: string;
	slack_id: string | null;
	phone_number: string | null;
	birthday: string | null;
	legal_first_name: string | null;
	legal_last_name: string | null;
	addresses: Array<{
		id: string;
		first_name: string;
		last_name: string;
		line_1: string;
		line_2: string | null;
		city: string;
		state: string;
		postal_code: string;
		country: string;
		phone_number: string | null;
		primary: boolean;
	}>;
}

interface MeResponse {
	identity: HackClubIdentity;
	scopes: string[];
}

export async function getUserProfile(accessToken: string): Promise<HackClubIdentity> {
	const response = await fetch(USER_URL, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to get user profile: ${error}`);
	}

	const data: MeResponse = await response.json();
	return data.identity;
}
