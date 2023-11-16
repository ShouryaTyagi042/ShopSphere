import User from "../models/user"
import { genAuthToken } from "../utility/genAuthToken";
import { hashPassword } from "../utility/hashPassword";



export const createUser = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const pass = hashPassword(password);
        const user = await User.create({ name, email, password: pass })
        console.log(user);
        const token = genAuthToken(name, email)
        res.status(201).send({ user, token })

    } catch (error) {
        res.status(400).send(error)
    }
}

export const loginUser = async (req: any, res: any) => {

}