"use server";
import { z } from "zod";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type FormState = {
  error?: string;
  success?: boolean;
  callbackUrl?: string;
  details?: {
    email?: string[];
    password?: string[];
  };
} | null;

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    callbackUrl: String(formData.get("callbackUrl") || "/dashboard"),
  };

  console.log("Login attempt:", rawData.email);

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    console.error("Validation errors:", parsed.error.flatten());
    return {
      error: "Invalid form data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, callbackUrl: rawData.callbackUrl };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }

    throw error;
  }
}
