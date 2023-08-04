import { z } from 'zod'

export const signupInput = z.object({
  username: z.string(),
  password: z.string(),
  type: z.string()
});

export type SignupParams = z.infer<typeof signupInput>;

export const loginInput = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginParams = z.infer<typeof loginInput>;

export const createProductInput = z.object({
  username: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  instock: z.number(),
  options: z.array(z.string()),
  info: z.string(),
  img1: z.string(),
  img2: z.string(),
  img3: z.string(),
  img4: z.string()
})

export type CreateProductParams = z.infer<typeof createProductInput>;