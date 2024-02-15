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
            const user = await findUser(session?.user?.email || "")

            session.user.role = user.user_role?.toString() as any
            session.user.id = user.user_id?.toString() as any

            return session
        },

        async signIn({ profile }) {
            try {
                let user = await findUser(profile?.email || "")

                if (!user) {
                    const new_user = userShema.parse({
                        user_id: uuid(),
                        user_email: profile?.email || "",
                        user_name: profile?.name || "",
                        user_picture: profile?.picture || "",
                    })

                    await createUser(new_user)
                    return true
                }
                return true
            } catch (error) {
                return false
            }
        }
    }
});


declare module "@auth/core/types" {
    interface Session {
        user: {
            name?: string
            email?: string
            image?: string
            role?: string
            id?: string
        }
    }
}