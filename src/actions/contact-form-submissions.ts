"use server";

import * as z from "zod";
import { database } from "@/lib/database";
import { ContactFormSchema } from "@/form-schemas";

export const submitContactForm = async (data: z.infer<typeof ContactFormSchema>) => {
  try {
    // Validate the input data
    const validatedData = ContactFormSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { fullName, email, subject, message } = validatedData;

    // Create the contact form submission
    const contactFormSubmission = await database.contactFormSubmissions.create({
      data: {
        fullName,
        email,
        message,
        subject,
        createdAt: new Date(),
      },
    });

    return { success: "Contact form submitted" };
  } catch (error) {
    return { error: (error as Error).message };
  }
};