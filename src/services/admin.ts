import Admin from "../models/admin"
import { checkPass } from "../utility/hashPassword"

export const findAdmin = async (email: string, password: string) => {
    const admin = await Admin.findOne({ email })
    if (!admin) {
        throw new Error('Unable to log in')
    }
    const isMatch = checkPass(password, admin.password)
    console.log(isMatch)
    if (!isMatch) {
        throw new Error('Incorrect password')
    }
    return admin
}

export const checkAdmin = async (email: string) => {
    const check = await Admin.findOne({ email });
    if (check) return true;
    return false
}
