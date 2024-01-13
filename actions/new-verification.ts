"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return { error: "Token does not exists." };
  }

  if (new Date(verificationToken?.expires) < new Date()) {
    return { error: "Token has been expired." };
  }

  const existingUser = await getUserByEmail(verificationToken.email);

  if (!existingUser) {
    return { error: "E-mail not registered in the database." };
  }

  await db.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: "Email verified with success." };
};
