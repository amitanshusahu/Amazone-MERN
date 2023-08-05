import productModel from "../models/ProductModel";
import userModel from "../models/UserModel";
import { Request, Response } from "express";
import { createProductInput } from 'types'

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
    const user = await userModel.findOne({username});
    if (user?.type != 'seller') {
      return res.status(403).json({status: false, msg: 'Not A Seller'});
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
  try{
    const products = await productModel.find();
    return res.status(200).json({stauts: true, products});
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({status: false, msg: 'Internal Server Error'});
  }
}

export async function getProduct(req: Request, res: Response): Promise<Response> {
  try{
    const pid = req.params.pid;

    const product = await productModel.findById(pid);
    return res.status(200).json({status: true, product});
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({status: false, msg: 'Internal Server Error'});
  }
}
