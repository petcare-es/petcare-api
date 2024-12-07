import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
    SERVER_PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string().default("secret"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "A validação das variáveis de ambiente falhou, erros: ",
    _env.error,
  );

  throw new Error("A validação das variáveis de ambiente falhou");
}

export default _env.data;
