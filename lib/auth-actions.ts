"use server";

import { auth, signOut } from "@/auth";
import axios from "axios";

export async function logOut() {
  const { idToken } = (await auth()) || {};

  await axios.get(process.env.END_SESSION_URL as string, {
    params: {
      id_token_hint: idToken,
      post_logout_redirect_uri: process.env.END_SESSION_URL,
    },
  });

  await signOut();
}
