import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/features/auth/actions";

type SignInPageProps = {
  searchParams: Promise<{
  error?: string;
  message?: string;
}>;
};

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const { error, message } = await searchParams;

  return (
    <main
      id="main-content"
      className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-12"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <Link
          className="font-semibold tracking-tight"
          href="/"
        >
          Clario
        </Link>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          Sign in
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Continue to your Clario workspace.
        </p>

        {message === "password-updated" ? (
        <p
            className="mt-5 rounded-md border border-border bg-muted/40 p-3 text-sm"
            role="status"
        >
            Your password has been updated. Sign in with your new password.
        </p>
        ) : null}

        {error ? (
          <FieldError className="mt-5">
            {error === "credentials"
                ? "The email or password is incorrect."
                : error === "confirmation"
                    ? "The confirmation link is invalid or has expired."
                    : error === "signout"
                    ? "We could not sign you out. Try again."
                    : error === "recovery"
                        ? "The password recovery link is invalid or has expired."
                        : "Check the form and try again."}
          </FieldError>
        ) : null}

        <form action={signIn} className="mt-6 grid gap-5">
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

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="current-password"
              id="password"
              name="password"
              required
              type="password"
            />
          </Field>

          <div className="text-right">
            <Link
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                href="/auth/forgot-password"
            >
                Forgot password?
            </Link>
          </div>

          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          New to Clario?{" "}
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="/auth/sign-up"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}