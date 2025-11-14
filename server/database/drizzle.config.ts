import { defineConfig } from "drizzle-kit";
import { tursoConfig } from "../../config/turso.config";

export default defineConfig({
    dialect: 'turso',
    schema: './server/database/schema',
    out: './server/database/migrations',
    dbCredentials: {
        url: tursoConfig.url,
        authToken: tursoConfig.authToken
    }
})