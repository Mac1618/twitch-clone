// Database connection
import { db } from "./db";

export const getSelfByUsername = async (username: string) => {
  // find the username on the database
  const user = await db.user.findUnique({
    where: { username: username },
  })
  
  // return user data
  return user;
}