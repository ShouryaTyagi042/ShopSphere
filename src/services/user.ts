import User from "../models/user"
import { checkPass } from "../utility/hashPassword"

export const findUser = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }
    const isMatch = checkPass(password, user.password)
    console.log(isMatch)
    if (!isMatch) {
        throw new Error('Incorrect password')
    }
    return user
}

export const checkUser = async (email: string) => {
    const check = await User.findOne({ email });
    if (check) return true;
    return false
}
