"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

type LoginActionType = z.infer<typeof LoginSchema>;

export const login = async (values: LoginActionType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
