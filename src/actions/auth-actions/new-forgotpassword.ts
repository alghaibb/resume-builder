"use server";

import { database } from "@/lib/database";
import { getUserByEmail } from "@/auth-data/user";
import { getForgotPasswordTokenByToken } from "@/auth-data/forgot-password-token";
import bcrypt from "bcryptjs";

export const NewForgotPassword = async (token: string, password: string) => {
  const existingForgotPasswordToken = await getForgotPasswordTokenByToken(token);

  if (!existingForgotPasswordToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = new Date(existingForgotPasswordToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserByEmail(existingForgotPasswordToken.email);

  if (!existingUser) {
    return { error: "User not found" }
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user to set their email as verified
  await database.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashedPassword
    }
  })

  // Update the password token to be marked as null and resetAt to be the current date
  await database.passwordResetToken.update({
    where: {
      id: existingForgotPasswordToken.id
    },
    data: {
      token: "",
      resetAt: new Date()
    }
  });

  return { success: "Password updated successfuly" };
}