import { pgTable, text, serial } from 'drizzle-orm/pg-core';

export const task = pgTable('task', {
    id: serial('id').primaryKey(), // auto-incrementing primary key for Postgres
	name: text('name'),
    tasks: text('tasks').array()
});
