import User from "../models/user";
import Cart from "../models/cart";
import { generateInvoice } from "../services/order";
import Order from "../models/order";


export const createOrder = async (req: any, res: any) => {
    try {
        if (!req.user.role.includes("user")) res.status(404).send({ error: "This is a protected route" })
        const ownerEmail: string = req.user.email;
        const owner = await User.findOne({ email: ownerEmail });
        const cart = await Cart.findOne({ user: ownerEmail });
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

export const cancelOrder = async (req: any, res: any) => {
    try {
        if (!req.user.role.includes("user")) res.status(404).send({ error: "This is a protected route" })
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        order!.isCancelled = true;
        await order?.save();
        res.status(200).send("order cancelled")
    } catch (error) {

    }

}