import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("combines conditional classes", () => {
    expect(cn("rounded-md", false && "hidden", "px-4")).toBe(
      "rounded-md px-4",
    );
  });

  it("keeps the last conflicting Tailwind class", () => {
    expect(cn("px-2", "px-6")).toBe("px-6");
  });
});
