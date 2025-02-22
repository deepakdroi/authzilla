import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should have at least 3 characters." }),
  age: z.number().min(18, { message: "You must me 18 years or above." }),
  gender: z.enum(["male", "female"], {
    message: "There are only two genders.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters." }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
