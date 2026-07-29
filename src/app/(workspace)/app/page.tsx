import { DatabaseZap } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";

export default function WorkspaceOverviewPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Application shell</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Workspace overview
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            The responsive shell and shared page states are ready. Supabase
            authentication arrives in Phase 2, followed by onboarding and live
            dashboard data in Phase 3.
          </p>
        </div>
        <StatusBadge tone="info">Foundation only</StatusBadge>
      </div>

      <div className="py-8">
        <EmptyState
          description="No static dashboard figures are shown because the workspace schema and authenticated queries have not been implemented yet."
          icon={<DatabaseZap aria-hidden="true" className="size-5" />}
          title="Live workspace data is not connected"
        />
      </div>
    </div>
  );
}
