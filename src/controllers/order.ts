import { Request, Response } from "express";
import User from "../models/user";
import Cart from "../models/cart";
import { generateInvoice } from "../services/order";
import Order from "../models/order";


export const createOrder = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) throw new Error("Only User can access this route")
        const ownerEmail: string = req.body.user.email;
        const owner = await User.findOne({ email: ownerEmail });
        const cart = await Cart.findOne({ userEmail: ownerEmail });
        owner!.balance -= cart!.bill;
        if (owner!.balance < 0) throw new Error("Low balance")
        const invoice = await generateInvoice(ownerEmail);
        cart!.products = [];
        await owner?.save();
        await cart?.save();
        res.status(201).send({ invoice })
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) throw new Error("Only User can access this route")
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) throw new Error("order was not found");
        order!.isCancelled = true;
        await order?.save();
        res.status(200).send("order cancelled")
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }

}