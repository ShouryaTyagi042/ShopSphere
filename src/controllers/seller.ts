import Seller from "../models/seller";
import Product from "../models/product";
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";
import { findSeller } from "../services/seller";

const role = "seller";
export const createSeller = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const pass = await hashPassword(password);
        const seller = await Seller.create({ name, email, password: pass })
        console.log(seller);
        const token = genAuthToken(name, email, role)
        console.log(token);
        res.status(201).send({ seller, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

export const loginSeller = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        const seller = await findSeller(email, password);
        const token = genAuthToken(name, email, role);
        res.send({ seller, token })
    } catch (error) {
        res.status(400).send(error)

    }
}

export const logoutSeller = async (req: any, res: any) => {
    try {
        const msg = `successfully logged out ${req.seller.name}`
        res.send(msg)
    } catch (error) {
        res.status(500).send()
    }
}

export const createProduct = async (req: any, res: any) => {
    const { name, description, price, category } = req.seller.body;
    // const product = await Seller.create({ seller, name, description, price, category })
    // console.log(product);
}