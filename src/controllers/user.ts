import User from "../models/user"
import { findUser } from "../services/user";
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";


export const createUser = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const pass = await hashPassword(password);
        const user = await User.create({ name, email, password: pass })
        console.log(user);
        const token = genAuthToken(name, email)
        console.log(token);
        res.status(201).send({ user, token })

    } catch (error) {
        res.status(400).send(error)
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        const user = await findUser(email, password);
        const token = genAuthToken(name, email);
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)

    }
}

export const logoutUser = async (req: any, res: any) => {
    try {
        const msg = `successfully logged out ${req.user.name}`
        res.send(msg)
    } catch (error) {
        res.status(500).send()
    }
}
