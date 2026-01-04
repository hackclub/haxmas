import { redirect, error, isRedirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { exchangeCodeForToken, getUserProfile } from '$lib/server/oauth';
import { db, type User } from '$lib/server/db';
import { createSession } from '$lib/server/session';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('oauth_state');
	const errorParam = url.searchParams.get('error');

	if (errorParam) {
		const errorDescription = url.searchParams.get('error_description') || 'Unknown error';
		throw error(400, `OAuth error: ${errorDescription}`);
	}

	if (!state || state !== storedState) {
		throw error(400, 'Invalid state parameter - possible CSRF attack');
	}

	if (!code) {
		throw error(400, 'No authorization code provided');
	}

	cookies.delete('oauth_state', { path: '/' });

	try {
		const accessToken = await exchangeCodeForToken(code);
		const identity = await getUserProfile(accessToken);

		let user = await db<User>('users').where('hackclub_id', identity.id).first();

		if (!user) {
			const [insertedUser] = await db<User>('users')
				.insert({
					hackclub_id: identity.id,
					email: identity.primary_email,
					first_name: identity.first_name,
					last_name: identity.last_name,
					slack_id: identity.slack_id,
					verification_status: identity.verification_status,
					ysws_eligible: identity.ysws_eligible,
					phone_number: identity.phone_number,
					birthday: identity.birthday,
					legal_first_name: identity.legal_first_name,
					legal_last_name: identity.legal_last_name,
					addresses: JSON.stringify(identity.addresses || []) as unknown as undefined,
					admin: false
					})
				.returning('*');
			user = insertedUser;
		} else {
			const [updatedUser] = await db<User>('users')
				.where('id', user.id)
				.update({
					email: identity.primary_email,
					first_name: identity.first_name,
					last_name: identity.last_name,
					slack_id: identity.slack_id,
					verification_status: identity.verification_status,
					ysws_eligible: identity.ysws_eligible,
					phone_number: identity.phone_number,
					birthday: identity.birthday,
					legal_first_name: identity.legal_first_name,
					legal_last_name: identity.legal_last_name,
					addresses: JSON.stringify(identity.addresses || []) as unknown as undefined,
					updated_at: new Date()
				})
				.returning('*');
			user = updatedUser;
		}

		const sessionId = await createSession(user.id);

		cookies.set('session_id', sessionId, {
			path: '/',
			maxAge: 30 * 24 * 60 * 60,
			secure: !dev,
			httpOnly: true,
			sameSite: 'lax'
		});

		throw redirect(302, '/');
	} catch (err) {
		if (isRedirect(err)) {
			throw err;
		}
		console.error('OAuth callback error:', err);
		throw error(500, 'Authentication failed');
	}
};
