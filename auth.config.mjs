import { createUser, findUser } from "@/db/user";
import { userShema } from "@/schemas/user";
import GoogleProvider from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";
import { v4 as uuid } from "uuid";

export default defineConfig({
  providers: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token}) {
      const user = await findUser(session?.user?.email || "");
      session.user.role = user.user_role?.toString();
      session.user.id = user.user_id?.toString();

      session.token = token.sub
  
      return session;
    },

    async signIn({ profile }) {
      try {
        let user = await findUser(profile?.email || "");

        if (!user) {
          const new_user = userShema.parse({
            user_id: uuid(),
            user_email: profile?.email || "",
            user_name: profile?.name || "",
            user_picture: profile?.picture || "",
          });

          await createUser(new_user);
          return true;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
