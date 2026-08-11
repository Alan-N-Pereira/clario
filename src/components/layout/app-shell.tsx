import Link from "next/link";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Gauge,
  Layers3,
  ReceiptText,
  Settings2,
  UsersRound,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";

import { PageContainer } from "@/components/layout/page-container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { StatusBadge } from "@/components/ui/status-badge";

const navigation = [
  { label: "Overview", href: "/app", icon: Gauge, available: true },
  { label: "Leads", icon: BriefcaseBusiness, phase: "Phase 4" },
  { label: "Clients", icon: UsersRound, phase: "Phase 4" },
  { label: "Projects", icon: FolderKanban, phase: "Phase 5" },
  { label: "Proposals", icon: FileText, phase: "Phase 6" },
  { label: "Invoices", icon: ReceiptText, phase: "Phase 6" },
  { label: "Settings", icon: Settings2, phase: "Phase 3" },
] as const;

function NavigationItems() {
  return (
    <nav aria-label="Workspace navigation" className="grid gap-1">
      {navigation.map((item) => {
        const Icon = item.icon;

        if ("available" in item && item.available) {
          return (
            <Link
              key={item.label}
              className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
              href={item.href}
            >
              <Icon aria-hidden="true" className="size-4" />
              {item.label}
            </Link>
          );
        }

        return (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-3">
              <Icon aria-hidden="true" className="size-4" />
              {item.label}
            </span>

            <span className="text-[0.65rem] font-medium uppercase tracking-wide">
              {"phase" in item ? item.phase : null}
            </span>
          </div>
        );
      })}
      <form action={signOut} className="mt-2">
        <Button
          className="w-full justify-start"
          size="sm"
          type="submit"
          variant="ghost"
        >
          <LogOut aria-hidden="true" className="size-4" />
          Sign out
        </Button>
      </form>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-muted/30">
      <div className="grid min-h-dvh lg:grid-cols-[17rem_1fr]">
        <aside className="hidden border-r border-border bg-background lg:block">
          <div className="sticky top-0 flex h-dvh flex-col p-4">
            <Link
              className="mb-8 inline-flex items-center gap-2 rounded-md px-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers3 aria-hidden="true" className="size-4" />
              </span>
              Clario
            </Link>

            <NavigationItems />

            <div className="mt-auto rounded-lg border border-border bg-muted/30 p-3">
              <StatusBadge tone="info">Foundation</StatusBadge>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Authentication and workspace data are introduced in the next
                phases.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-border bg-background">
            <PageContainer className="flex min-h-16 items-center justify-between gap-3 py-3">
              <Link
                aria-label="Return to Clario home"
                className="inline-flex min-w-0 items-center gap-2 rounded-md font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                href="/"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Layers3 aria-hidden="true" className="size-4" />
                </span>
                <span className="truncate">Clario</span>
              </Link>

              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Workspace
                </p>
                <p className="font-semibold">Clario foundation</p>
              </div>

              <ThemeToggle />
            </PageContainer>

            <details className="border-t border-border px-4 py-2 lg:hidden">
              <summary className="cursor-pointer rounded-md py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Workspace navigation
              </summary>

              <div className="pb-2 pt-3">
                <NavigationItems />
              </div>
            </details>
          </header>

          <main id="main-content">
            <PageContainer className="py-8 sm:py-10">
              {children}
            </PageContainer>
          </main>
        </div>
      </div>
    </div>
  );
}