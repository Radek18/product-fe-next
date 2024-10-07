"use server";

import axios from "axios";
import { auth, signOut } from "@/auth";

export async function logOut() {
  const { idToken } = (await auth()) || {};

  try {
    await axios.get(process.env.END_SESSION_URL as string, {
      params: {
        id_token_hint: idToken,
        post_logout_redirect_uri: process.env.END_SESSION_URL,
      },
    });

    await signOut();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to log out.");
  }
}
