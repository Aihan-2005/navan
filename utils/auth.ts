import { z } from "zod";

// Schema login
export const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  email: z
      .string()
      .min(3,"ایمیل را وارد کنید.") 
      .email("لطفاً یک ایمیل معتبر وارد کنید."),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد." }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

// registery

export const registerSchema = z
  .object({
    username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
    name: z.string(),
    surname: z.string(),
    email: z.email({ message: "لطفاً یک ایمیل معتبر وارد کنید" }),
    password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),

    // .regex(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    //   message:
    //     "رمز عبور باید شامل حروف بزرگ و کوچک، عدد و یک کاراکتر خاص باشد.",
    // }),

    confirmPassword: z.string("لطفاً تکرار رمز عبور را وارد کنید"),
    rememberMe: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "تکرار رمز عبور با رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
