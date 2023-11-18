import Cart from "../models/cart";
import Product from "../models/product";
import User from "../models/user";

export const addtoCart = async (req: any, res: any) => {
    try {
        if (!req.user.role.includes("user")) res.status(404).send({ error: "This is a protected route" })
        const owner: string = req.user.email;
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: owner });
        const product = await Product.findById(productId);
        console.log(product);
        if (!product) {
            res.status(404).send({ message: "product not found" });
            return;
        }
        cart!.products.push({ productId, price: product.price, name: product.name, quantity });
        console.log(cart!.products);
        cart!.bill = cart?.products.reduce((acc: number, curr: any) => {
            return acc + curr.price * curr.quantity;
        }, 0)
        console.log(cart!.bill);
        await cart!.save();
        res.status(201).send({ cart })
    } catch (error) {

    }
}

export const getItems = async (req: any, res: any) => {
    try {
        if (!req.user.role.includes("user")) res.status(400).send("this is a protected route");
        const cart = await Cart.findOne({ user: req.user.email })
        const products = cart?.products;
        const bill = cart?.bill;
        res.status(200).send({ products, bill })

    } catch (error) {

    }
}

