import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email." })
  .min(1)
  .trim()
  .transform((email) => email.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character.",
  })
  .trim();

export const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
