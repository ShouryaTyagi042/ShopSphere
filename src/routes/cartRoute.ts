import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { addtoCart } from '../controllers/cart'


const router = express.Router()
router.post('/addtocart', auth, addtoCart) // add product to cart

export default router;
