import express from 'express'
import User from "../models/user"
import "dotenv/config"

const bcrypt = require("bcrypt")
const saltRounds: number = 10;
const jwt = require("jsonwebtoken")

export const createUser = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        //service layer
        const token = jwt.sign({ name, email }, process.env.JWT_SECRET)
        const pass = await bcrypt
            .hash(password, saltRounds)
        const user = await User.create({ name, email, password: pass })
        console.log(user);
        res.status(201).send({ user, token })

    } catch (error) {
        res.status(400).send(error)
    }
}