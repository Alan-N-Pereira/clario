import Link from "next/link";
import { Layers3, LayoutDashboard } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  return (
    <header className="border-b border-border/80 bg-background/95">
      <PageContainer className="flex min-h-16 items-center justify-between gap-2 py-3">
        <Link
          className="inline-flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          href="/"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layers3 aria-hidden="true" className="size-4" />
          </span>
          Clario
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <Link
            aria-label="View application shell"
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "size-9 px-0 sm:h-8 sm:w-auto sm:px-3",
            )}
            href="/app"
          >
            <LayoutDashboard aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">View app shell</span>
          </Link>
        </div>
      </PageContainer>
    </header>
  );
}