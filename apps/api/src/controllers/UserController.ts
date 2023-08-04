import userModel from "../models/UserModel";
import { Request, Response } from 'express';
import { z } from 'zod';
import { signupInput, loginInput } from 'types';
import jwt from 'jsonwebtoken';


// @desc save use to the database if not already present
export async function signup(req: Request, res: Response): Promise<Response> {
  try {
    // input validation 
    const parsedResponse = signupInput.safeParse(req.body);
    if (!parsedResponse.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input',
      });
    }

    // Check if username is already present, else save
    const { username, password, type } = req.body;
    const isUser = await userModel.findOne({ username });
    if (isUser) return res.status(401).json({ status: false, msg: 'User Alredy exits!!' });
    else await userModel.create({ username, password, type });
    if (!process.env.SECRET) return res.status(500);
    const token = jwt.sign({ username }, process.env.SECRET);
    return res.status(200).json({ status: true, token });
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error!!' });
  }
}

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    // input validation 
    const parsedResponse = loginInput.safeParse(req.body);
    if (!parsedResponse.success) {
      return res.status(401).json({
        status: false,
        msg: 'Invalid Input',
      });
    }

    // Check if username is present, else invalid
    const { username, password } = req.body;
    const isUser = await userModel.findOne({ username, password });
    if (!isUser) return res.status(401).json({ status: false, msg: 'Invalid Username Or Passoword' });
    else {
      if (!process.env.SECRET) return res.status(500);
      const token = jwt.sign({ username }, process.env.SECRET);
      return res.status(200).json({ status: true, token });
    }
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error!!' });
  }
}

export async function me(req: Request, res: Response): Promise<Response> {
  try {
    const username = req.headers.user;
    return res.status(200).json({ status: true, username});
  }
  catch (ex) {
    console.log(ex);
    return res.status(500).json({ status: false, msg: 'Internal Server Error!!' });
  }
}