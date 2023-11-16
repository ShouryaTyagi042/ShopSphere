import "dotenv/config"
const jwt = require("jsonwebtoken")
export const genAuthToken = (name: string, email: string) => jwt.sign({ name, email }, process.env.JWT_SECRET) 