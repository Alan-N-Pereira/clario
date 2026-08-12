import { describe, expect, it } from "vitest";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/features/auth/schemas";

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

describe("forgotPasswordSchema", () => {
  it("normalizes a valid email address", () => {
    expect(
      forgotPasswordSchema.parse({
        email: "  ALEX@EXAMPLE.COM  ",
      }),
    ).toEqual({
      email: "alex@example.com",
    });
  });

  it("rejects an invalid email address", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("accepts matching valid passwords", () => {
    const result = resetPasswordSchema.safeParse({
      password: "new-password-123",
      confirmPassword: "new-password-123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects passwords that do not match", () => {
    const result = resetPasswordSchema.safeParse({
      password: "new-password-123",
      confirmPassword: "different-password",
    });

    expect(result.success).toBe(false);
  });
});