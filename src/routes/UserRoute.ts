import express from 'express'
import User from "../models/User"

const router = express.Router()

//signup
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        //service layer
        const pass = password + "ss";
        const user = await User.create({ name, email, password: pass })
        console.log(user);
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router