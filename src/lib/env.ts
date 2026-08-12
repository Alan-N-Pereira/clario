import * as z from "zod";

const httpsUrlSchema = z
  .string()
  .trim()
  .pipe(
    z.url({
      protocol: /^https$/,
    }),
  );

const siteUrlSchema = z
  .string()
  .trim()
  .pipe(
    z.url({
      protocol: /^https?$/,
    }),
  );

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: httpsUrlSchema,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().trim().min(1),
  NEXT_PUBLIC_SITE_URL: siteUrlSchema,
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

const publicEnvInput = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

export function parsePublicEnv(input: unknown): PublicEnv {
  const result = publicEnvSchema.safeParse(input);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => {
        const field = issue.path.join(".") || "environment";
        return `${field}: ${issue.message}`;
      })
      .join("; ");

    throw new Error(`Invalid public environment configuration: ${details}`);
  }

  return result.data;
}

export function getPublicEnv(): PublicEnv {
  return parsePublicEnv(publicEnvInput);
}