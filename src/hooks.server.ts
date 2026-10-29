import type { Handle } from '@sveltejs/kit/hooks';
import { getSessionUser } from '#lib/server/session.js';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');

	if (sessionId) {
		const user = await getSessionUser(sessionId);
		if (user) {
			event.locals.user = user;
			event.locals.sessionId = sessionId;
		} else {
			event.cookies.delete('session_id', { path: '/' });
		}
	}

	return resolve(event);
};
