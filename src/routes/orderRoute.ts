import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { createOrder } from '../controllers/order'

const router = express.Router()

router.post('/order', auth, createOrder)

export default router