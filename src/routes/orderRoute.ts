import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { cancelOrder, createOrder } from '../controllers/order'

const router = express.Router()

router.post('/order', auth, createOrder) // create an order 
router.put('/cancel-order', auth, cancelOrder) // cancel an existing order

export default router