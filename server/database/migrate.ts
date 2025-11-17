import { migrate } from 'drizzle-orm/libsql/migrator'

import config from '../../drizzle.config'
import { useDrizzle } from '../database/drizzle'

const db = useDrizzle()

await migrate(db, { migrationsFolder: config.out! })
