import { PageContainer } from "@/components/layout/page-container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <PageContainer className="flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Clario is being developed as a portfolio SaaS project.</p>
        <p>Privacy and terms pages are planned templates, not legal advice.</p>
      </PageContainer>
    </footer>
  );
}
