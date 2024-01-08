"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

type RegisterActionType = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterActionType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Email already in use!" };
    }

    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { success: "User created!" };
  } catch (er) {
    console.log(er);
    return { error: "Something went wrong, please try again later" };
  }
};
