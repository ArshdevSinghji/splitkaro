import z from "zod";

export const SignInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .nonempty("password is required!")
    .min(8, "passoword must be at least of 8 characters"),
});

export type ZSignInSchema = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    username: z.string().nonempty("username is required!"),
    email: z.email(),
    password: z
      .string()
      .nonempty("password is required!")
      .min(8, "passoword must be at least of 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "password must match!",
    path: ["confirmPassword"],
  });

export type ZSignUpSchema = z.infer<typeof SignUpSchema>;
