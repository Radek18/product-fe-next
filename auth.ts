import axios from "axios";
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    idToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    sub: string;
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresAt: number;
    iat: number;
    exp: number;
    jti: string;
  }
}

async function refreshToken(token: JWT) {
  try {
    const response = await axios.post(
      process.env.REFRESH_TOKEN_URL as string,
      {
        client_id: process.env.AUTH_KEYCLOAK_ID as string,
        client_secret: process.env.AUTH_KEYCLOAK_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    const refreshedToken = response.data;

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      idToken: refreshedToken.id_token,
      refreshToken: refreshedToken.refresh_token,
      expiresAt: Math.floor(Date.now() / 1000) + refreshedToken.expires_in,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to refresh token.");
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      } else if (nowTimeStamp < token.expiresAt) {
        return token;
      } else {
        const refreshedToken = await refreshToken(token);
        return refreshedToken;
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
});
