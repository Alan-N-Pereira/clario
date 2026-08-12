"use server";

import { redirect } from "next/navigation";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/features/auth/schemas";
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

export async function requestPasswordReset(formData: FormData) {
  const result = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    redirect("/auth/forgot-password?error=invalid");
  }

  const supabase = await createClient();
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnv();

  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
    {
      redirectTo: `${NEXT_PUBLIC_SITE_URL}/auth/recovery`,
    },
  );

  if (error) {
    console.error("Supabase password-reset email failed", {
      code: error.code,
      message: error.message,
      status: error.status,
    });

    redirect("/auth/forgot-password?error=send");
  }

  redirect("/auth/forgot-password?sent=1");
}

export async function updatePassword(formData: FormData) {
  const result = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    redirect("/auth/reset-password?error=invalid");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/sign-in?error=recovery");
  }

  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
  });

  if (error) {
    console.error("Supabase password update failed", {
      code: error.code,
      message: error.message,
      status: error.status,
    });

    redirect("/auth/reset-password?error=update");
  }

  const { error: signOutError } = await supabase.auth.signOut({
    scope: "local",
  });

  if (signOutError) {
    console.error("Supabase post-reset sign-out failed", {
      code: signOutError.code,
      message: signOutError.message,
      status: signOutError.status,
    });
  }

  redirect("/auth/sign-in?message=password-updated");
}