import { z } from "zod";

const singUpValidators = z.object({
  firstName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Must be at least 3 characters" }),
  lastName: z.string(),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Must be at least 6 characters" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must contain 10 character" }),
});

const logInValidators = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Must be at least 6 characters" }),
})

export { singUpValidators, logInValidators };
