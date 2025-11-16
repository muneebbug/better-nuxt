import { migrate } from 'drizzle-orm/libsql/migrator'

import { useDrizzle } from '../database/drizzle'
import config from './drizzle.config'

const db = useDrizzle()

await migrate(db, { migrationsFolder: config.out! })
