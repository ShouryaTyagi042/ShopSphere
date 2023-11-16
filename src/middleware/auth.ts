const jwt = require('jsonwebtoken')
const User = require('../models/user')

export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded.email.toString());
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: "Authentication required" })
    }
}

