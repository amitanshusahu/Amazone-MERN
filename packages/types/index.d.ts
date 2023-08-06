import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    type: string;
}, {
    username: string;
    password: string;
    type: string;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export declare const loginInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type LoginParams = z.infer<typeof loginInput>;
export declare const createProductInput: z.ZodObject<{
    username: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    options: z.ZodArray<z.ZodString, "many">;
    info: z.ZodString;
    img1: z.ZodString;
    img2: z.ZodString;
    img3: z.ZodString;
    img4: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    options: string[];
    title: string;
    description: string;
    price: number;
    info: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
}, {
    username: string;
    options: string[];
    title: string;
    description: string;
    price: number;
    info: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
}>;
export type CreateProductParams = z.infer<typeof createProductInput>;
export declare const OrderInput: z.ZodObject<{
    seller: z.ZodString;
    pid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    seller: string;
    pid: string;
}, {
    seller: string;
    pid: string;
}>;
export type OrderParams = z.infer<typeof OrderInput>;
export declare const addToCartInput: z.ZodObject<{
    pid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pid: string;
}, {
    pid: string;
}>;
export type AddToCartParams = z.infer<typeof addToCartInput>;
export declare const buyFromCart: z.ZodObject<{
    pid: z.ZodArray<z.ZodString, "many">;
    seller: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    seller: string[];
    pid: string[];
}, {
    seller: string[];
    pid: string[];
}>;
export type BuyFromCartParams = z.infer<typeof buyFromCart>;
