import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";
import { loginSchema } from "./lib/schemas/loginSchema";
import { NextAuthConfig } from "next-auth";

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;
          console.log(email, password);

          const user = await getUserByEmail(email);
          console.log(user);

          if (!user || !(await compare(password, user.hashedPassword))) {
            return null;
          }

          return user;
        }

        return null; // Return null if validation fails
      },
    }),
  ],
};

export default authOptions;
