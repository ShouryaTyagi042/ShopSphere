import { Request, Response } from "express";
import Admin from "../models/admin";
import User from "../models/user";
import { checkAdmin, findAdmin } from "../services/admin";
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";

const role = ["admin"];

export const createAdmin = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        if (await checkAdmin(email)) throw new Error("Admin already exists")
        const pass = await hashPassword(password);
        const admin = await Admin.create({ name, email, password: pass })
        console.log(admin);
        const token = genAuthToken(name, email, role)
        console.log(token);
        res.status(201).send({ admin, token })

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await findAdmin(email, password);
        const token = genAuthToken(name, email, role);
        res.status(200).send({ user, token })
    } catch (error: any) {
        res.status(400).json({ error: error.message });

    }
}

export const logoutAdmin = async (req: Request, res: Response) => {
    try {
        const msg = `successfully logged out ${req.body.user.name}`
        res.send(msg)
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const authoriseSeller = async (req: Request, res: Response) => {
    try {
        console.log(req.body.user.role.includes("admin"));
        if (!req.body.user.role.includes("admin")) throw new Error("Only Admin can access this")
        const { email } = req.body;
        console.log(email);
        const user = await User.findOne({ email });
        user!.is_seller = true;
        await user?.save();
        console.log(user);
        res.status(200).send(user)

    } catch (error: any) {
        res.status(400).json({ error: error.message });

    }
}
