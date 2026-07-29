import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("uses button as the safe default type", () => {
    render(<Button>Save changes</Button>);

    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("calls the click handler", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Create client</Button>);
    await user.click(screen.getByRole("button", { name: "Create client" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("prevents interaction while disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Saving
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Saving" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
