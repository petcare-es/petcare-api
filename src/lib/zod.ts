import { z } from "zod";

export const authSchema = z.object({
    email: z
        .string({ required_error: "O e-mail é requerido" })
        .email({ message: "O e-mail mal formatado"}),
    password: z
        .string({ required_error: "A senha é requerida" })
        .min(6, { message: "A senha é muito pequena" })
});