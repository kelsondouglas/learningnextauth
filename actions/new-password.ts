"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";

type NewPasswordType = z.infer<typeof NewPasswordSchema>;

export const newPassword = async (token: string, values: NewPasswordType) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const { password } = validatedFields.data;

  const newPasswordResetToken = await getPasswordResetTokenByToken(token);

  if (!newPasswordResetToken) {
    return { error: "Token does not exists..." };
  }

  const hasExpired = new Date(newPasswordResetToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has been expired." };
  }

  const existingUser = await getUserByEmail(newPasswordResetToken.email);

  if (!existingUser) {
    return { error: "User does not exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: newPasswordResetToken.id,
    },
  });

  return { success: "Password reseted successfuly" };
};
