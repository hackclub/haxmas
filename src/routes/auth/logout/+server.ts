import { redirect } from '@sveltejs/kit';
import { deleteSession } from '#lib/server/session.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session_id');

	if (sessionId) {
		await deleteSession(sessionId);
	}

	cookies.delete('session_id', { path: '/' });

	throw redirect(302, '/');
};

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session_id');

	if (sessionId) {
		await deleteSession(sessionId);
	}

	cookies.delete('session_id', { path: '/' });

	throw redirect(302, '/');
};
