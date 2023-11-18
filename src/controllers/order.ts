import { Request, Response } from "express";
import User from "../models/user";
import Cart from "../models/cart";
import { generateInvoice } from "../services/order";
import Order from "../models/order";


export const createOrder = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) res.status(404).send({ error: "This is a protected route" })
        const ownerEmail: string = req.body.user.email;
        const owner = await User.findOne({ email: ownerEmail });
        const cart = await Cart.findOne({ userEmail: ownerEmail });
        owner!.balance -= cart!.bill;
        if (owner!.balance < 0) throw console.error("low balance");
        const invoice = await generateInvoice(ownerEmail);
        cart!.products = [];
        await owner?.save();
        await cart?.save();
        res.status(201).send({ invoice })
    } catch (error) {
        res.status(400).send("order creation failed")
    }
}

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        if (!req.body.user.role.includes("user")) res.status(404).send({ error: "This is a protected route" })
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) res.status(404).send("Order not found")
        order!.isCancelled = true;
        await order?.save();
        res.status(200).send("order cancelled")
    } catch (error) {
        res.status(400).send(error)
    }

}