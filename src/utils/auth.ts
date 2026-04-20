import { z } from "zod";

// Schema login
export const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  email: z.string().email({ message: "لطفاً یک ایمیل معتبر وارد کنید." }),
  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "رمز عبور باید شامل حروف بزرگ و کوچک، عدد و یک کاراکتر خاص باشد.",
      },
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
