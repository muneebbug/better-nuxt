export function checkEnv(env: NodeJS.ProcessEnv) {
    const required = [
        "NODE_ENV",
        "NUXT_NITRO_PRESET",
        "NUXT_APP_URL",
        "NUXT_APP_NAME",

        "NUXT_SESSION_PASSWORD",
        "NUXT_TURSO_DATABASE_URL",
        "NUXT_TURSO_AUTH_TOKEN",

        "NUXT_BETTER_AUTH_SECRET",
        "NUXT_BETTER_AUTH_URL",


        "NUXT_MAILGUN_API_KEY",
        "NUXT_MAILGUN_DOMAIN",
        "NUXT_MAIL_FROM_EMAIL"
    ];

    const missing = required.filter((key) => !env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}
