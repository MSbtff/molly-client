"use server";

import { cookies } from "next/headers";

export async function loginStatus() {
  const token = (await cookies()).get("Authorization");

  return {
    isLoggedIn: !!token,
  };
}
