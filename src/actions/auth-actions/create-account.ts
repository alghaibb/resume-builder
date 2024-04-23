"use server";

import * as z from "zod";
import { database } from "@/lib/database";
import bcrypt from "bcryptjs";
import { RegisterFormSchema } from "@/form-schemas";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/emails/send-verify-email";


export const register = async (data: z.infer<typeof RegisterFormSchema>) => {
  try {
    // Validate the input data
    const validatedData = RegisterFormSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { fullName, email, password, confirmPassword } = validatedData;

    // Check if passwords match
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check to see if user already exists
    const userExists = await database.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (userExists) {
      return { error: "Email already is in use. Please try another one." };
    }

    const lowerCaseEmail = email.toLowerCase();

    // Create the user
    const user = await database.user.create({
      data: {
        fullName,
        email: lowerCaseEmail,
        password: hashedPassword,
      },
    });

    // Generate a verification token
    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(email, verificationToken.token)

    return { success: "Email Verification was sent" };
  } catch (error) {
    // Handle the error, specifically check for a 503 error
    console.error("Database error:", error);

    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
};