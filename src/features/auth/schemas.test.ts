import { describe, expect, it } from "vitest";

import { signInSchema, signUpSchema } from "@/features/auth/schemas";

describe("signUpSchema", () => {
  it("normalizes a valid sign-up submission", () => {
    const result = signUpSchema.parse({
      fullName: "  Alex Morgan  ",
      email: "  ALEX@EXAMPLE.COM  ",
      password: "correct-horse",
    });

    expect(result).toEqual({
      fullName: "Alex Morgan",
      email: "alex@example.com",
      password: "correct-horse",
    });
  });

  it("rejects a short password", () => {
    const result = signUpSchema.safeParse({
      fullName: "Alex Morgan",
      email: "alex@example.com",
      password: "short",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = signUpSchema.safeParse({
      fullName: "Alex Morgan",
      email: "not-an-email",
      password: "correct-horse",
    });

    expect(result.success).toBe(false);
  });
});

describe("signInSchema", () => {
  it("rejects an empty password", () => {
    const result = signInSchema.safeParse({
      email: "alex@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });
});