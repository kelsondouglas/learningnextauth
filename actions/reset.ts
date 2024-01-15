"use server";

import { generatePasswordResetToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetToken } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

type ResetActionType = z.infer<typeof ResetSchema>;

export const reset = async (values: ResetActionType) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Email is not valid." };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User does not found." };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetToken(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "Reset email sent",
  };
};
