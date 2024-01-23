import { NextAuthOptions } from "next-auth";
import OktaProvider from "next-auth/providers/okta";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID || "",
      clientSecret: process.env.OKTA_CLIENT_SECRET || "",
      issuer: process.env.OKTA_ISSUER,
    }),
  ],
};
