import GoogleProvider from "@auth/core/providers/google";
import { User, db, eq } from "astro:db";
import { defineConfig } from "auth-astro";
import { createHash } from "node:crypto";

export default defineConfig({
  providers: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await db.select().from(User).where(eq(User.user_email, session.user.email))
      session.user.role = user[0].user_role;
      session.user.id = user[0].user_id;
      session.token = token.sub;
      
      return session;
    },

    async signIn({ user }) {
      try {
        let found = await db
          .select()
          .from(User)
          .where(eq(User.user_email, user.email));

        if (found.length === 0) {
          await db.insert(User).values({
            user_id: createHash("sha256").update(user.email).digest("hex"),
            user_email: user.email,
            user_name: user.name,
            user_picture: user.image,
          });
          return true;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
