import { Request, Response } from "express";
import Admin from "../models/admin";
import User from "../models/user";
import { findAdmin } from "../services/admin";
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";

const role = ["admin"];

export const createAdmin = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const pass = await hashPassword(password);
        const admin = await Admin.create({ name, email, password: pass })
        console.log(admin);
        const token = genAuthToken(name, email, role)
        console.log(token);
        res.status(201).send({ admin, token })

    } catch (error) {
        res.status(400).send(error)
    }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await findAdmin(email, password);
        const token = genAuthToken(name, email, role);
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)

    }
}

export const logoutAdmin = async (req: Request, res: Response) => {
    try {
        const msg = `successfully logged out ${req.body.user.name}`
        res.send(msg)
    } catch (error) {
        res.status(500).send()
    }
}

export const authoriseSeller = async (req: Request, res: Response) => {
    try {
        console.log(req.body.user.role.includes("admin"));
        if (!req.body.user.role.includes("admin")) res.status(404).send({ error: "This is a protected route" })
        const { email } = req.body;
        console.log(email);

        const user = await User.findOne({ email });
        user!.is_seller = true;
        await user?.save();
        console.log(user);
        res.status(200).send(user)

    } catch (error) {

    }
}
