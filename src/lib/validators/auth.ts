import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Contraseña mínimo 6 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre mínimo 2 caracteres'),
  password: z.string().min(6, 'Contraseña mínimo 6 caracteres'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
