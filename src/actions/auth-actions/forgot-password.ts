"use server";

import * as z from "zod";
import { ForgotPasswordFormSchema } from "@/form-schemas";
import { getUserByEmail } from "@/auth-data/user";
import { generateForgotPasswordToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/emails/send-password-reset";

export const forgotPassword = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
  try {
    // Validate the input data
    const validatedData = ForgotPasswordFormSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { email } = validatedData;

    // Check if user exists
    const userExists = await getUserByEmail(email);

    if (!userExists) {
      return { error: "User not found" };
    }

    // Generate a forgot password token
    const forgotPasswordToken = await generateForgotPasswordToken(email);

    // Send the forgot password email
    await sendPasswordResetEmail(email, forgotPasswordToken.token);

    return { success: "Forgot password token was sent" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

export default forgotPassword;