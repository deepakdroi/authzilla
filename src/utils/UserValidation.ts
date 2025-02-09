import { z } from "zod";

export const UserValidation = z.object({
    firstName : z.string().min(3, "First name must have at least 3 characters").max(15, "First name can have at most 15 characters"),
    lastName : z.string().min(3, "Last name must have at least 3 characters").max(15, "Last name can have at most 15 characters"),
    email : z.string().email("Invalid email address"),
    password : z.string().min(6, "Password must have atleast 6 characters")
})