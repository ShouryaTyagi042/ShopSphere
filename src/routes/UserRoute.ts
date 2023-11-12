import express from 'express'
import User from "../models/user"
import "dotenv/config"


const router = express.Router()
const jwt = require("jsonwebtoken")
//signup
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        //service layer
        const token = jwt.sign({ name, email }, process.env.JWT_SECRET)
        const user = await User.create({ name, email, password, token })
        console.log(user);
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router