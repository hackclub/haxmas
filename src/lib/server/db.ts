import knex from 'knex';
import { DATABASE_URL } from '$env/static/private';

export const db = knex({
	client: 'pg',
	connection: DATABASE_URL,
	pool: {
		min: 2,
		max: 10
	}
});

export interface User {
	id: number;
	hackclub_id: string;
	email: string;
	first_name: string | null;
	last_name: string | null;
	slack_id: string | null;
	verification_status: string | null;
	ysws_eligible: boolean;
	phone_number: string | null;
	birthday: string | null;
	legal_first_name: string | null;
	legal_last_name: string | null;
	addresses: Address[];
	snowflakes: number;
	admin: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface Address {
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
}

export interface Session {
	id: string;
	user_id: number;
	expires_at: Date;
	created_at: Date;
	updated_at: Date;
}
