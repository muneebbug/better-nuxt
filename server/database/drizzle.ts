import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import { tursoConfig } from '../../config/turso.config'
import * as schema from './schema'

const tursoClient = createClient({
  url: tursoConfig.url,
  authToken: tursoConfig.authToken,
})

const db = drizzle(tursoClient)

export function useDrizzle() {
  return db
}

export const tables = schema

export type UserInsert = typeof schema.user.$inferInsert
export type UserRegisterType = Omit<UserInsert, 'createdAt' | 'updatedAt' | 'id' | 'emailVerified'>
