"use client";

import { getSession } from "next-auth/react";

/**
 * Get the internal user's name and ID.
 * The logged in user's email must match the internal user's.
 */
export const getUser = async () => {
  const session = await getSession();
  const result = await fetch("/api/users/internal");
  const internalUsers = await result.json();
  const userEmail = session?.user?.email;
  const internalUser = internalUsers.data.find(
    (user: any) => user.Users_Email === userEmail
  );
  return {
    id: internalUser?.Users_ID || null,
    name: internalUser?.Users_Name || null,
  };
};
