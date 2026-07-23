import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

describe("EmptyState", () => {
  it("presents its message with a named region", () => {
    render(
      <EmptyState
        action={<Button>Add lead</Button>}
        description="Add the first lead when the pipeline is connected."
        title="No leads yet"
      />,
    );

    expect(
      screen.getByRole("region", { name: "No leads yet" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add lead" })).toBeInTheDocument();
  });
});
