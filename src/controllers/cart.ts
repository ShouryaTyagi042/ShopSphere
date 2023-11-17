import Cart from "../models/cart";
import Product from "../models/product";

export const addtoCart = async (req: any, res: any) => {
    try {
        if (req.user.role != "user") res.status(404).send({ error: "This is a protected route" })
        const owner: string = req.user.email;
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: owner });
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            res.status(404).send({ message: "product not found" });
            return;
        }
        cart?.products.push({ productId, quantity });
        cart!.bill = cart?.products.reduce(async (acc: number, curr: any) => {
            const currProduct = await Product.findOne({ _id: curr.productId })
            return acc + currProduct!.price * curr.quantity;
        }, 0)
        await cart!.save();
    } catch (error) {

    }

}