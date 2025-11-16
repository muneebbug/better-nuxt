import env from './env.config';

const isProd = env.NODE_ENV === 'production';

export const tursoConfig = {
    isProd,
    url: isProd ? env.NUXT_TURSO_DATABASE_URL : 'file:local.db',
    authToken: env.NUXT_TURSO_AUTH_TOKEN
};