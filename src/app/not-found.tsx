import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main id="main-content">
      <PageContainer className="flex min-h-dvh flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          This Clario page does not exist
        </h1>
        <p className="mt-4 max-w-md leading-7 text-muted-foreground">
          The address may be incorrect, or the route may belong to a feature
          planned for a later phase.
        </p>
        <Link
          className={cn(buttonVariants(), "mt-8")}
          href="/"
        >
          Return home
        </Link>
      </PageContainer>
    </main>
  );
}
