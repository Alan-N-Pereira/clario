import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-12"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <MailCheck aria-hidden="true" className="size-6" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Check your email
        </h1>

        <p className="mt-3 leading-7 text-muted-foreground">
          We sent you a confirmation link. Open it in this browser to verify your
  email and continue to Clario.
        </p>

        <Link
          className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          href="/auth/sign-in"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}