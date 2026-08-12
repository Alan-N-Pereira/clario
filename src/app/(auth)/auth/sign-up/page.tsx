import Link from "next/link";

import { signUp } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignUpPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps) {
  const { error } = await searchParams;

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
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Start a Clario workspace for your client work.
        </p>

        {error ? (
          <FieldError className="mt-5">
            {error === "invalid"
              ? "Check the form and try again."
              : "We could not create your account. Try again."}
          </FieldError>
        ) : null}

        <form action={signUp} className="mt-6 grid gap-5">
          <Field>
            <Label htmlFor="fullName">Full name</Label>
            <Input
              autoComplete="name"
              id="fullName"
              maxLength={100}
              name="fullName"
              required
            />
          </Field>

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
              aria-describedby="password-help"
              autoComplete="new-password"
              id="password"
              minLength={8}
              name="password"
              required
              type="password"
            />

            <p
              className="text-sm text-muted-foreground"
              id="password-help"
            >
              Use at least 8 characters.
            </p>
          </Field>

          <Button className="w-full" type="submit">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
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