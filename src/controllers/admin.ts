import Admin from "../models/admin";
import User from "../models/user"
import { createCart } from "../services/cart";
import { findUser } from "../services/user";
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";

const role = ["admin"];

export const createAdmin = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const pass = await hashPassword(password);
        const admin = await Admin.create({ name, email, password: pass })
        console.log(admin);
        const token = genAuthToken(name, email, role)
        console.log(token);
        const cart = await createCart(email);
        console.log(cart);
        res.status(201).send({ admin, token, cart })

    } catch (error) {
        res.status(400).send(error)
    }
}

export const loginAdmin = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        const user = await findUser(email, password);
        const token = genAuthToken(name, email, role);
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)

    }
}

export const logoutAdmin = async (req: any, res: any) => {
    try {
        const msg = `successfully logged out ${req.user.name}`
        res.send(msg)
    } catch (error) {
        res.status(500).send()
    }
}

export const authoriseSeller = async (req: any, res: any) => {
    try {
        if (req.user.role.findIndex("admin") == -1) res.status(404).send({ error: "This is a protected route" })
        const { email } = req.body;
        const user = await User.findOne({ email });
        user!.is_seller = true;
        await user?.save();
        console.log(user);

    } catch (error) {

    }
}
