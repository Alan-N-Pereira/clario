"use server";

import { redirect } from "next/navigation";

import { signInSchema, signUpSchema } from "@/features/auth/schemas";
import { getPublicEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: FormData) {
  const result = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    redirect("/auth/sign-up?error=invalid");
  }

  const supabase = await createClient();
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnv();

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName,
      },
      emailRedirectTo: `${NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });

  if (error) {
    console.error("Supabase sign-up failed", {
      code: error.code,
      message: error.message,
      status: error.status,
    });

    redirect("/auth/sign-up?error=signup");
  }

  redirect("/auth/check-email");
}

export async function signIn(formData: FormData) {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    redirect("/auth/sign-in?error=invalid");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    console.error("Supabase sign-in failed", {
      code: error.code,
      message: error.message,
      status: error.status,
    });

    redirect("/auth/sign-in?error=credentials");
  }

  redirect("/app");
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    console.error("Supabase sign-out failed", {
      code: error.code,
      message: error.message,
      status: error.status,
    });

    redirect("/auth/sign-in?error=signout");
  }

  redirect("/auth/sign-in");
}