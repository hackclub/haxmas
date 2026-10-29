/** @type {import('knex').Knex.Config} */
export default {
	client: 'pg',
	connection: process.env.DATABASE_URL,
	migrations: {
		directory: './migrations',
		tableName: 'knex_migrations'
	},
	pool: {
		min: 2,
		max: 10
	}
};
