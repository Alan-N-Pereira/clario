import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/sign-in");
  }

  return <AppShell>{children}</AppShell>;
}