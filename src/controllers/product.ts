import { Request, Response } from "express";
import Product from "../models/product";


export const createProduct = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("seller")) throw new Error("Only Seller can access this route");
        const { name, description, price, category } = req.body;
        const sellerEmail = req.body.user.email
        const product = await Product.create({ sellerEmail, name, description, price, category })
        console.log(product);
        res.status(201).send({ product })

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

