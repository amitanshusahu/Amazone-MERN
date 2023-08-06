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
  options: z.array(z.string()),
  info: z.string(),
  img1: z.string(),
  img2: z.string(),
  img3: z.string(),
  img4: z.string()
})

export type CreateProductParams = z.infer<typeof createProductInput>;

export const updateProductInput = z.object({
  pid: z.string(),
  username: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  options: z.array(z.string()),
  info: z.string(),
  img1: z.string(),
  img2: z.string(),
  img3: z.string(),
  img4: z.string()
})

export type UpdateProductParams = z.infer<typeof updateProductInput>;


export const OrderInput = z.object({
  seller: z.string(),
  pid: z.string(),
});

export type OrderParams = z.infer<typeof OrderInput>;

export const addToCartInput = z.object({
  pid: z.string(),
});

export type AddToCartParams = z.infer<typeof addToCartInput>;

export const buyFromCart = z.object({
  pid: z.array(z.string()),
  seller: z.array(z.string()),
})

export type BuyFromCartParams = z.infer<typeof buyFromCart>;