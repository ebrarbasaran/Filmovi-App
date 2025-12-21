//sadece edge safe //middleware icin
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt", //edge icin jwt 
  },
  pages: {
    signIn: "/login",
  },
  providers: [], // middleware provider kullanmaz
};
