import User from "../models/user"
import Cart from "../models/cart"
import Order from "../models/order"

export const generateInvoice = async (ownerEmail: string) => {
    try {
        const user = await User.findOne({ email: ownerEmail });
        const cart = await Cart.findOne({ userEmail: ownerEmail });
        const order = await Order.create({ name: user!.name, email: user!.email, products: cart!.products, bill: cart?.bill })
        console.log(order);
        return order;
    } catch (error) {

    }

}