import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role: "USER" | "ADMIN";
        } & DefaultSession["user"];
    }

    interface User {
        role: "USER" | "ADMIN";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "USER" | "ADMIN";
    }
}

//dbye role ekledim ama ts tanimadi bildirmedim
//nextAuth runtimeda bilir ts bilmez