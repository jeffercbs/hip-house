import GoogleProvider from "@auth/core/providers/google";
import { findUser, createUser } from "@/db/user"
import { defineConfig } from "auth-astro";
import { userShema } from "@/schemas/user"
import { v4 as uuid } from "uuid";

export default defineConfig({
    secret: import.meta.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            return session
        },

        async signIn({ profile }) {
            try {
                const user = await findUser(profile?.email || "")

                if (user.length === 0) {
                    const newUser = userShema.parse({
                        user_id: uuid(),
                        user_role: "client",
                        user_name: profile?.given_name,
                        user_email: profile?.email,
                    })

                    await createUser(newUser)
                }
                return true
            } catch (error) {
                return false
            }
        }
    }
});