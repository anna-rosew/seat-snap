import prisma from "@/prisma/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password...",
        },
      },
      authorize: async (credentials) => {
        // Check if username and password are provided
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          return null;
        }

        // Validate the password
        const match = await bcrypt.compare(credentials.password, user.password);

        if (match) {
          // Return the user object (must match the JWT and session token shape)
          return {
            id: user.id.toString(),
            name: user.name,
            username: user.username,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Attach the user role to the JWT token
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Attach the user role to the session
      if (session.user) {
        session.user.role = token.role || "USER";
      }
      return session;
    },
  },
};

export default options;
