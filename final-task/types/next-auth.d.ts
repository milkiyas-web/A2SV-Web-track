// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role?: string;
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    id?: string;
    role?: string;
  }
}
