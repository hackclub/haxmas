/** @param {import('knex').Knex} knex */
export function up(knex) {
	return knex.schema.alterTable('users', (table) => {
		table.boolean('admin').defaultTo(false).notNullable();
	});
}

/** @param {import('knex').Knex} knex */
export function down(knex) {
	return knex.schema.alterTable('users', (table) => {
		table.dropColumn('admin');
	});
}
