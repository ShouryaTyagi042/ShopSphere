import { Request, Response, NextFunction } from "express"
const jwt = require('jsonwebtoken')

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')!.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        req.body.user = decoded;
        next()
    } catch (error) {
        res.status(401).send({ error: "Authentication required" })
    }
}

