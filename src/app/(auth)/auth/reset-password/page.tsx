import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePassword } from "@/features/auth/actions";
import { createClient } from "@/lib/supabase/server";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { error } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in?error=recovery");
  }

  return (
    <main
      id="main-content"
      className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-12"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="font-semibold tracking-tight">Clario</p>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          Choose a new password
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter a new password for your Clario account.
        </p>

        {error ? (
          <FieldError className="mt-5">
            {error === "invalid"
              ? "Use matching passwords with at least 8 characters."
              : "We could not update your password. Try again."}
          </FieldError>
        ) : null}

        <form action={updatePassword} className="mt-6 grid gap-5">
          <Field>
            <Label htmlFor="password">New password</Label>
            <Input
              autoComplete="new-password"
              id="password"
              minLength={8}
              name="password"
              required
              type="password"
            />
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              autoComplete="new-password"
              id="confirmPassword"
              minLength={8}
              name="confirmPassword"
              required
              type="password"
            />
          </Field>

          <Button className="w-full" type="submit">
            Update password
          </Button>
        </form>
      </div>
    </main>
  );
}