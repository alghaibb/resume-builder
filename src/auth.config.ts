import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./auth-data/user";
import { LoginFormSchema } from "./form-schemas";


export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginFormSchema.safeParse(credentials)

        if (!validatedCredentials.success) {
          return null;
        }

        const { email, password } = validatedCredentials.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return user;
        }

        return null;
      }
    })
  ]
} satisfies NextAuthConfig;