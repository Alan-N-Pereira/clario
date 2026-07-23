import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({
  title = "We could not load this page",
  description = "Try again. If the problem continues, keep the reference shown in the error message and check the server logs.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "rounded-xl border border-destructive/25 bg-destructive/5 px-6 py-8",
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <CircleAlert aria-hidden="true" className="size-5" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      </div>
    </section>
  );
}
