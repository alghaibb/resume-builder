"use server";

import { database } from "@/lib/database";
import { getUserByEmail } from "@/auth-data/user";
import { getVerificationTokenByToken } from "@/auth-data/verification-token";

export const NewVerification = async (token: string) => {
  const existingVerificationToken = await getVerificationTokenByToken(token);

  if (!existingVerificationToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = new Date(existingVerificationToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserByEmail(existingVerificationToken.email);

  if (!existingUser) {
    return { error: "User not found" }
  }

  // Update user to set their email as verified
  await database.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: existingVerificationToken.email
    }
  })

  // Update the verification token to be marked as verified
  await database.verificationToken.update({
    where: {
      id: existingVerificationToken.id
    },
    data: {
      verified: true,
      token: ""
    }
  });

  return { success: "Email verified successfuly" };
}