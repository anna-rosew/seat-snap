import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: SeparatorConfig;
      role: StorageManager;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name: string;
    username: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
