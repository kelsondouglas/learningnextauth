import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required." }),
});

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must have a minimun of 6 characters" }),
});
