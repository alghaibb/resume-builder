import * as z from "zod";

export const RegisterFormSchema = z.object({
  fullName: z.string().min(3,
    { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "Please enter your first and last name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

export const PasswordResetFormSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const ContactFormSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "Please enter your first and last name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters long" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});