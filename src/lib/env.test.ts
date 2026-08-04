import { describe, expect, it } from "vitest";

import { parsePublicEnv } from "@/lib/env";

const validEnv = {
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "example-publishable-key",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
};

describe("parsePublicEnv", () => {
  it("returns valid public environment configuration", () => {
    expect(parsePublicEnv(validEnv)).toEqual(validEnv);
  });

  it("rejects a missing Supabase URL", () => {
    expect(() =>
      parsePublicEnv({
        ...validEnv,
        NEXT_PUBLIC_SUPABASE_URL: undefined,
      }),
    ).toThrow("NEXT_PUBLIC_SUPABASE_URL");
  });

  it("rejects a non-HTTPS Supabase URL", () => {
    expect(() =>
      parsePublicEnv({
        ...validEnv,
        NEXT_PUBLIC_SUPABASE_URL: "http://example.supabase.co",
      }),
    ).toThrow("NEXT_PUBLIC_SUPABASE_URL");
  });

  it("rejects an empty publishable key", () => {
    expect(() =>
      parsePublicEnv({
        ...validEnv,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "   ",
      }),
    ).toThrow("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  });

  it("rejects an invalid site URL", () => {
    expect(() =>
      parsePublicEnv({
        ...validEnv,
        NEXT_PUBLIC_SITE_URL: "not-a-url",
      }),
    ).toThrow("NEXT_PUBLIC_SITE_URL");
  });
});