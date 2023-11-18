import { Request, Response } from "express";
import User from "../models/user"
import { createCart } from "../services/cart";
import { findUser } from "../services/user";
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";

const role = ["user"];

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const pass = await hashPassword(password);
        const user = await User.create({ name, email, password: pass })
        console.log(user);
        const token = genAuthToken(name, email, role)
        console.log(token);
        const cart = await createCart(email);
        console.log(cart);
        res.status(201).send({ user, token, cart })

    } catch (error) {
        res.status(400).send(error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await findUser(email, password);
        if (user.is_seller) role.push("seller")
        const token = genAuthToken(name, email, role);
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)

    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const msg = `successfully logged out ${req.body.user.name}`
        res.send(msg)
    } catch (error) {
        res.status(500).send()
    }
}

