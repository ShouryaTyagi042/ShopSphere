import User from "../models/user";
import Cart from "../models/cart";
import { generateInvoice } from "../services/order";


export const createOrder = async (req: any, res: any) => {
    try {
        const ownerEmail: string = req.user.email;
        const owner = await User.findOne({ email: ownerEmail });
        const cart = await Cart.findOne({ user: ownerEmail });
        owner!.balance -= cart!.bill;
        if (owner!.balance < 0) throw console.error();
        const invoice = generateInvoice(ownerEmail);
        cart!.products = [];
        await owner?.save();
        await cart?.save();
        res.status(201).send({ invoice })
    } catch (error) {

    }


}