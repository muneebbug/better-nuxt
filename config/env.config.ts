export function checkEnv(env: NodeJS.ProcessEnv) {
    const required = [
        "NUXT_TURSO_DATABASE_URL",
        "NUXT_TURSO_AUTH_TOKEN",
        "BETTER_AUTH_SECRET",
        "NUXT_BETTER_AUTH_URL",
        "BETTER_AUTH_URL",
    ];

    const missing = required.filter((key) => !env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}
