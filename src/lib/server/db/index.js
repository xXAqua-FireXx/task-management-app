import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.NETLIFY_DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = new Pool({connectionString:env.NETLIFY_DATABASE_URL})

export const db = drizzle(pool);
