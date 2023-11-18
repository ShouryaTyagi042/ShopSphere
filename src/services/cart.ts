import Cart from "../models/cart"

export const createCart = async (userEmail: string) => {
    const cart = await Cart.create({ userEmail });
    console.log(cart);
}



