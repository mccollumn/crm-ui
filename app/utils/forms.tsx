import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getInternalUsers } from "./getData";

/**
 * Returns user info if the logged in user's email matches the internal user's.
 * @returns Owner ID and name.
 */
export const getDefaultOwner = async () => {
  const session = await getServerSession(authOptions);
  const internalUsers = await getInternalUsers();
  const userEmail = session?.user?.email;
  const owner = internalUsers.find(
    (user: any) => user.Users_Email === userEmail
  );
  return { id: owner?.Users_ID || null, name: owner?.Users_Name || null };
};
