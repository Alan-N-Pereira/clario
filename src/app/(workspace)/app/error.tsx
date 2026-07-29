"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Workspace route error", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <ErrorState
      action={<Button onClick={reset}>Try again</Button>}
      description={
        error.digest
          ? `The workspace could not be rendered. Reference: ${error.digest}`
          : "The workspace could not be rendered. Try the request again."
      }
    />
  );
}
