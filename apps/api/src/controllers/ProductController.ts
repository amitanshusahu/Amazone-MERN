import { isSeller } from "../lib/utils";
import orderModel from "../models/OrderModel";
import productModel from "../models/ProductModel";
import cartModel from '../models/CartModel';
import userModel from "../models/UserModel";
import { Request, Response } from "express";
import { createProductInput, OrderInput, addToCartInput, buyFromCart, updateProductInput } from 'types';

export async function createProduct(req: Request, res: Response): Promise<Response> {

  try {
    // input validation
    const parsedInput = createProductInput.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input'
      })
    }

    // Check if its a seller
    const { username, title, description, price, options, info, img1, img2, img3, img4 } = req.body;
    const user = await userModel.findOne({ username });
    if (user?.type != 'seller') {
      return res.status(403).json({ status: false, msg: 'Not A Seller' });
    }

    // Save product to db
    await productModel.create({
      username,
      title,
      description,
      price,
      options,
      info,
      img1,
      img2,
      img3,
      img4
    });

    return res.status(200).json({ status: true });
  }
  catch (ex) {
    console.log(ex)
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }

}

export async function getProducts(req: Request, res: Response): Promise<Response> {
  try {
    // Check if the usename is a seller
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (isseller) {
        const products = await productModel.find({username: req.headers.user});
        console.log(products);
        return res.status(200).json({ stauts: true, products });
      } else {
        const products = await productModel.find();
        return res.status(200).json({ stauts: true, products });
      }
    }

    return res.status(500).json({ stauts: true, msg: 'something went wrong' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function getProduct(req: Request, res: Response): Promise<Response> {
  try {
    const pid = req.params.pid;

    const product = await productModel.findById(pid);
    return res.status(200).json({ status: true, product });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function buyProduct(req: Request, res: Response): Promise<Response> {
  try {
    // input validation
    const parsedInput = OrderInput.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input'
      })
    }

    // Check if the username is a buyer, save buy to db
    const { seller, pid } = req.body;
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (!isseller) {
        const isthisseller = await isSeller(seller);
        if (isthisseller) {
          await orderModel.create({ buyer: req.headers.user, seller, pid });
          return res.status(200).json({ status: true });
        }
      } else {
        return res.status(200).json({ status: false, msg: 'You are not a buyer' });
      }
    }

    return res.status(200).json({ status: false, msg: 'Something went wrong' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function getBuyerOrders(req: Request, res: Response): Promise<Response> {
  try {

    // Check if the usename is a buyer
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (!isseller) {
        const orders = await orderModel.find({ buyer: req.headers.user });
        return res.status(200).json({ status: true, orders });
      } else {
        return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
      }
    }

    return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function getSellerOrders(req: Request, res: Response): Promise<Response> {
  try {

    // Check if the usename is a seller
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (isseller) {
        const orders = await orderModel.find({ seller: req.headers.user });
        return res.status(200).json({ status: true, orders });
      } else {
        return res.status(403).json({ status: false, msg: "This is'nt a seller account" });
      }
    }

    return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function addToCart(req: Request, res: Response): Promise<Response> {
  try {
    // input validation
    const parsedInput = addToCartInput.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input'
      })
    }

    // Check if the usename is a buyer
    const { pid } = req.body;
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (!isseller) {
        await cartModel.create({ username: req.headers.user, pid });
        return res.status(200).json({ status: true });
      } else {
        return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
      }
    }

    return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function getCart(req: Request, res: Response): Promise<Response> {
  try {

    // Check if the usename is a buyer
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (!isseller) {
        const cart = await cartModel.find({ username: req.headers.user });
        return res.status(200).json({ status: true, cart });
      } else {
        return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
      }
    }

    return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function buyfromcart(req: Request, res: Response): Promise<Response> {
  try {
    // input validation
    const parsedInput = buyFromCart.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input'
      })
    }

    // Check if the usename is a buyer
    const { pid, seller } = req.body;
    if (typeof req.headers.user == 'string') {
      const isseller = await isSeller(req.headers.user);
      if (!isseller) {
        for (let i = 0; i < pid.length; i++) {
          await orderModel.create({ pid: pid[i], seller: seller[i], buyer: req.headers.user });
        }
        return res.status(200).json({ status: true });
      } else {
        return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
      }
    }


    return res.status(500).json({ status: false, msg: 'something went worng' });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
}

export async function updateProduct(req: Request, res: Response): Promise<Response> {

  try {
    // input validation
    const parsedInput = updateProductInput.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input'
      })
    }

    // Check if its a seller
    const { pid, username, title, description, price, options, info, img1, img2, img3, img4 } = req.body;
    const user = await userModel.findOne({ username });
    if (user?.type != 'seller') {
      return res.status(403).json({ status: false, msg: 'Not A Seller' });
    }

    // Save product to db
    await productModel.findByIdAndUpdate(pid, {
      username,
      title,
      description,
      price,
      options,
      info,
      img1,
      img2,
      img3,
      img4
    });

    return res.status(200).json({ status: true });
  }
  catch (ex) {
    console.log(ex)
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }

}