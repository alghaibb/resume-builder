"use server";

import * as z from "zod";
import { LoginFormSchema } from "@/form-schemas";
import { getUserByEmail } from "@/auth-data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginFormSchema>) => {
  // Validate the input data
  const validatedData = LoginFormSchema.parse(data);

  // If the data is invalid, return an error
  if (!validatedData) {
    return { error: "Invalid input data" };
  }

  // Destructure the validated data
  const { email, password } = validatedData;

  // Check if user exists
  const userExists = await getUserByEmail(email);

  // If the user does not exist, return an error
  if (!userExists || !userExists.email || !userExists.password) {
    return { error: "User does not exist" };
  }

  try {
    await signIn("credentials", {
      email: userExists.email,
      password: password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Please confirm yours email address" };
      }
    }

    throw error;
  }

  return { success: "User logged in successfully" };
};