
import { betterAuth } from "better-auth";
import { Pool } from "pg";


const googleProvider =
    process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        }
        : {};

const githubProvider =
    process.env.GITHUB_CLIENT_ID &&
        process.env.GITHUB_CLIENT_SECRET
        ? {
            github: {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            },
        }
        : {};

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),

    baseURL:
        process.env.BETTER_AUTH_URL || "http://localhost:3000",

    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        ...googleProvider,
        ...githubProvider,
    },
});
