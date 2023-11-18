import Product from "../models/product";



export const createProduct = async (req: any, res: any) => {
    try {
        if (!req.user.role.includes("seller")) res.status(404).send({ error: "This is a protected route" })
        const { name, description, price, category } = req.body;
        const sellerEmail = req.user.email
        const product = await Product.create({ seller: sellerEmail, name, description, price, category })
        console.log(product);
        res.status(201).send({ product })

    } catch (error) {
        res.status(400).send()
    }
}