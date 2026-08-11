import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  const redirectTo = request.nextUrl.clone();
  redirectTo.search = "";

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      redirectTo.pathname = "/auth/reset-password";

      return NextResponse.redirect(redirectTo);
    }

    console.error("Supabase password recovery code exchange failed", {
      code: error.code,
      message: error.message,
      status: error.status,
    });
  }

  redirectTo.pathname = "/auth/sign-in";
  redirectTo.searchParams.set("error", "recovery");

  return NextResponse.redirect(redirectTo);
}