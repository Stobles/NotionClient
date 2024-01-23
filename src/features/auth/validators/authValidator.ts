import { z } from "zod";

export const UserAuthValidator = z.object({
  email: z
    .string()
    .min(1, "Поле должно быть заполнено"),
  password: z
    .string()
    .min(6, "Пароль должен быть длинее 5 символов")
    .max(24, "Пароль не должен быть длинее 24 символов"),
});

export type UserAuthRequest = z.infer<typeof UserAuthValidator>;
