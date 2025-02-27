import { z } from "zod";

import { MeasurementUnits } from "types/FoodDiaryType";
import { Mood } from "types/MoodDiaryType";

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
        .nativeEnum(Mood,{ 
            required_error: "O humor é obrigatório",
            invalid_type_error: "O humor deve ser um dos valores permitidos",
        }),
    date: z
        .coerce
        .date({ required_error: "A data é obrigatória" })
})

export const registerAppointmentSchema = z.object({
    name: z
        .string({ required_error: "O nome é requerido" })
        .min(1, { message: "O nome não pode estar vazio" }),
    location: z
        .string({ required_error: "O local do compromisso é requerido"})
        .min(1, {message: "O local não pode estar vazio"}),
    type: z
        .enum(["VACINA", "CONSULTA", "REMEDIO"],{ 
            required_error: "O tipo é obrigatório",
            invalid_type_error: "O tipo deve ser um dos valores permitidos",
        }),
    scheduledDate: z
        .coerce
        .date({ required_error: "A data é obrigatória" })
});

export const registerFoodDiarySchema = z.object({
    amout: z
        .number({ required_error: "A quantidade é obrigatória" })
        .positive({ message: "A quantidade deve ser maior que zero" }),
    unit: z.nativeEnum(MeasurementUnits, {
        required_error: "A unidade de medida é obrigatório",
        invalid_type_error: "A unidade de medida deve ser um dos valores permitidos"
    }),
    date: z
        .coerce
        .date({ required_error: "A data é obrigatória" })

});

export const registerWeightDiarySchema = z.object({
    weight: z
        .number({ required_error: "O peso é obrigatório" })
        .positive({ message: "O peso deve ser maior que zero" }),
    date: z
        .coerce
        .date({ required_error: "A data é obrigatória" })

});
