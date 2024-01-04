"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

type RegisterActionType = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterActionType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
