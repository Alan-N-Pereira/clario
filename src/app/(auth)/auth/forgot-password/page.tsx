import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/features/auth/actions";

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
    sent?: string;
  }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const { error, sent } = await searchParams;

  return (
    <main
      id="main-content"
      className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-12"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <Link className="font-semibold tracking-tight" href="/">
          Clario
        </Link>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter your email address and we&apos;ll send you a password reset
          link.
        </p>

        {sent === "1" ? (
          <p
            className="mt-5 rounded-md border border-border bg-muted/40 p-3 text-sm leading-6"
            role="status"
          >
            If an account exists for that email address, check your inbox for
            the password reset link.
          </p>
        ) : null}

        {error ? (
          <FieldError className="mt-5">
            {error === "invalid"
              ? "Enter a valid email address."
              : "We could not send the reset email right now. Try again later."}
          </FieldError>
        ) : null}

        <form action={requestPasswordReset} className="mt-6 grid gap-5">
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              autoComplete="email"
              id="email"
              name="email"
              required
              type="email"
            />
          </Field>

          <Button className="w-full" type="submit">
            Send reset link
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="/auth/sign-in"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}