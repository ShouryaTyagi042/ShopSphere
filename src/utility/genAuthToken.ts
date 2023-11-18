import "dotenv/config"
const jwt = require("jsonwebtoken")
export const genAuthToken = (name: string, email: string, role: string[]) => jwt.sign({ name, email, role }, process.env.JWT_SECRET) 