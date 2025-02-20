import { z } from "zod";

export const authUserSchema = z.object({
    email: z
        .string({ required_error: "O e-mail é requerido" })
        .email({ message: "O e-mail mal formatado" }),
    password: z
        .string({ required_error: "A senha é requerida" })
        .min(6, { message: "A senha é muito pequena" })
});

export const registerUserSchema = z.object({
    name: z
        .string({ required_error: "O nome é requerido" })
        .min(1, { message: "O nome não pode estar vazio" }),
    email: z
        .string({ required_error: "O e-mail é requerido" })
        .email({ message: "O e-mail está mal formatado" }),
    password: z
        .string({ required_error: "A senha é requerida" })
        .min(6,{ message: "A senha é muito pequena" }),
});


export const idParamSchema = z.object({
    id: z
        .string({ required_error: "O id é requerido" })
        .uuid({ message: "uuid precisa ser válido"})
});

export const registerPetSchema = z.object({
    name: z
        .string({ required_error: "O nome é requerido" })
        .min(1, { message: "O nome não pode estar vazio" }),
});

export const registerVaccineSchema = z.object({
    name: z
        .string({ required_error: "O nome é requerido" })
        .min(1, { message: "O nome não pode estar vazio" }),
    location: z
        .string({ required_error: "O local da vacina é requerido"})
        .min(1, {message: "O local não pode estar vazio"})
})

export const registerMoodDiarySchema = z.object({
    mood: z
        .enum(["NERVOSO", "FELIZ", "CANSADO", "ANCIOSO", "CARINHOSO", "TRISTE"],{ 
            required_error: "O humor é obrigatório",
            invalid_type_error: "O humor deve ser um dos valores permitidos",
        }),
    date: z
        .date({required_error: "A data é obrigatória"}) 
})