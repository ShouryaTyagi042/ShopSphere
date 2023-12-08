import { Request, Response } from "express";
import Cart from "../models/cart";
import Product from "../models/product";



export const addtoCart = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) throw new Error("Only user can access this route")
        const owner: string = req.body.user.email;
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userEmail: owner });
        if (!cart) throw new Error("User not found")
        const product = await Product.findById(productId);
        console.log(product);
        if (!product) throw new Error("Product was not found")
        cart!.products.push({ productId, price: product.price, name: product.name, quantity });
        console.log(cart!.products);
        cart!.bill = cart?.products.reduce((acc: number, curr: any) => {
            return acc + curr.price * curr.quantity;
        }, 0)
        console.log(cart!.bill);
        await cart!.save();
        res.status(201).send({ cart })
    } catch (error: any) {
        res.status(400).json({ error: error.message });

    }
}

export const getItems = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) throw new Error("Only user can access this route");
        const cart = await Cart.findOne({ userEmail: req.body.user.email })
        const products = cart?.products;
        res.status(200).send({ products })

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) throw new Error("Only user can access this route");
        const { productId } = req.body;
        const cart = await Cart.findOne({ userEmail: req.body.user.email })
        let productFound = false;
        cart?.products.forEach((product: any) => {
            if (product.productId.toString() == productId) {
                productFound = true;
                cart.products.splice(cart.products.indexOf(product), 1)
                cart.bill -= product.price * product.quantity
            }
        });
        if (!productFound) throw new Error("Product was not found")
        await cart!.save();
        res.status(200).send("product deleted from cart");

    } catch (error: any) {
        res.status(400).json({ error: error.message });

    }
}

export const emptyCart = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) res.status(400).send("Only user can access this route");
        const cart = await Cart.findOne({ userEmail: req.body.user.email });
        cart!.products = [];
        cart!.bill = 0;
        cart!.save();
        res.status(200).send("Emptied the cart")
    } catch (error) {
        res.status(400).send(error)
    }

}
