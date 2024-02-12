import GoogleProvider from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
    secret: import.meta.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        })
    ]
});