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
        throw new Error('Unable to login')
    }
    return admin
}
