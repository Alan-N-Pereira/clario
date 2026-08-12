import * as z from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(72, "Password must contain 72 characters or fewer."),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  password: z.string().min(1, "Enter your password."),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(72, "Password must contain 72 characters or fewer."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;