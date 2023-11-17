import { ObjectId } from "mongodb";
import Product from "../models/product";
import Seller from "../models/seller";
import { checkPass } from "../utility/hashPassword"

export const findSeller = async (email: string, password: string) => {
    const seller = await Seller.findOne({ email })
    if (!seller) {
        throw new Error('Unable to log in')
    }
    const isMatch = checkPass(password, seller.password)
    console.log(isMatch)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return seller;
}
