"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormState = { //sunucunun cliente verecegi durum raporu
  error?: string; //genel hatalar 
  success?: boolean; 
  details?: { //alan bazli detaylar
    email?: string[];
    username?: string[];
    password?: string[];
  };
} | null; //null: formun initial durumu

export async function registerAction(
  prevState: FormState, //onceki state
  formData: FormData //form verileri name uzerinden getler
): Promise<FormState> { //return tipi
  const rawData = {
    //formData.get() string dönmez
    //tipi: FormDataEntryValue | null
    //ama zod semam string bekliyor o yuzden invalid error hatasi aldin
    email: String(formData.get("email") || ""),
    username: String(formData.get("username") || ""),
    password: String(formData.get("password") || ""),
  };
  // Debug: log what you're receiving
  console.log("Raw data:", rawData);

  const parsed = registerSchema.safeParse(rawData);

  if (!parsed.success) {
    console.error("Validation errors:", parsed.error.flatten());
    return {
      error: "Invalid form data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, username, password } = parsed.data;
  //neden direkt rawData icindeki veriler degil?
  //parsed.data zod'tan basariyla gectigi icin tip guvenirligi var 

  try {
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (exists) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // auto login
    await signIn("credentials", {
      email,
      password,
      redirect: false, // redirect:false cunku redirect'i server degil client yonetecek
    });
    
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration" };
  }
}
