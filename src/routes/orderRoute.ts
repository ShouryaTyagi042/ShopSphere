import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { cancelOrder, createOrder } from '../controllers/order'

const router = express.Router()

router.post('/order', auth, createOrder)
router.patch('/cancel-order', auth, cancelOrder)

export default router