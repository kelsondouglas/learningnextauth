import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({ message: "E-mail is required." }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must have a minimun of 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must have a minimun of 6 characters" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password and Confirm password must be the same.",
      });
    }
  });

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
