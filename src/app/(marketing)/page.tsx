import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  FolderKanban,
  MessageSquareText,
  ReceiptText,
  UsersRound,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const exampleSteps = [
  {
    title: "The bakery gets in touch",
    description:
      "A local bakery asks you to build a new website. You save the enquiry and their contact details in Clario.",
    icon: MessageSquareText,
  },
  {
    title: "They hire you",
    description:
      "You turn the enquiry into a client without entering the bakery’s details again.",
    icon: UsersRound,
  },
  {
    title: "You manage the project",
    description:
      "You track the website deadline, progress, budget and updates in one project.",
    icon: FolderKanban,
  },
  {
    title: "You send the paperwork",
    description:
      "You create the proposal and invoice, then let the bakery view shared updates in its private portal.",
    icon: ReceiptText,
  },
] as const;

const capabilities = [
  {
    title: "New enquiries",
    description:
      "Keep the name, contact details and request from someone who may hire you.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Clients and projects",
    description:
      "See who hired you, what you are working on and when the work is due.",
    icon: FolderKanban,
  },
  {
    title: "Proposals and invoices",
    description:
      "Prepare the documents connected to the client and the work you are doing.",
    icon: FileText,
  },
  {
    title: "Client portal",
    description:
      "Share selected updates and documents without exposing private notes or other clients.",
    icon: UsersRound,
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <section className="border-b border-border bg-background">
        <PageContainer className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <StatusBadge tone="info">
              Portfolio MVP — foundation phase
            </StatusBadge>

            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Manage client work from the first enquiry to the final invoice.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Clario is a work organiser for freelancers, consultants and small
              agencies. When someone asks about your services, you can save the
              enquiry, turn them into a client if they hire you, track the work,
              and create the proposal and invoice in the same place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className={cn(buttonVariants({ size: "lg" }))}
                href="/app"
              >
                Preview the workspace
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <a
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                )}
                href="#example"
              >
                See a simple example
              </a>
            </div>
          </div>

          <div
            aria-label="Illustrative Clario lead pipeline preview"
            className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-foreground/5 sm:p-6"
            role="img"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-sm font-semibold">Lead pipeline</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Interface preview — not live business data
                </p>
              </div>

              <StatusBadge className="shrink-0" tone="outline">
                Preview
              </StatusBadge>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["New enquiry", "Client agreed", "Proposal sent"].map(
                (stage, index) => (
                  <div
                    key={stage}
                    className="min-w-0 rounded-xl border border-border bg-muted/25 p-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {stage}
                    </p>

                    <div className="mt-3 rounded-lg border border-border bg-background p-3 shadow-xs">
                      <p className="text-sm font-medium">
                        {
                          [
                            "Bakery website",
                            "Website redesign",
                            "Website proposal",
                          ][index]
                        }
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Demonstration record
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      <section
        id="example"
        className="border-b border-border bg-muted/25 py-16 sm:py-20"
      >
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              A simple example
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              You are a web designer and a bakery needs a website
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Instead of keeping the enquiry in email, the project in a task
              app and the invoice in a spreadsheet, you keep the whole job
              together in Clario.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exampleSteps.map(
              ({ title, description, icon: Icon }, index) => (
                <li
                  key={title}
                  className="rounded-xl border border-border bg-card p-5 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>

                    <span className="text-sm font-semibold tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 font-semibold">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </li>
              ),
            )}
          </ol>

          <div className="mt-8 rounded-xl border border-primary/25 bg-accent/45 p-5 sm:p-6">
            <p className="font-semibold">The result</p>
            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
              You can open the bakery’s client record and see its contact
              details, website project, proposal, invoice and shared updates
              without searching through several different tools.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-border bg-background py-16 sm:py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              What Clario keeps together
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              The important parts of a client job
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Each part stays connected, so you can understand what is
              happening with a client without rebuilding the story from emails,
              documents and spreadsheets.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-xl border border-border bg-card p-5 shadow-xs"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-5 font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section id="foundation" className="bg-muted/25 py-16 sm:py-20">
        <PageContainer>
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              What the current phase establishes
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              The working client-management features will be added in later
              phases. This phase establishes the shared interface, responsive
              layouts, accessibility foundation and automated test setup.
            </p>

            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Light, dark and system theme preferences",
                "Visible keyboard focus and reduced-motion support",
                "Reusable buttons, fields, status badges and feedback states",
                "Vitest and React Testing Library configuration",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-success"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}