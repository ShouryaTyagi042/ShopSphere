import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { addtoCart, getItems } from '../controllers/cart'


const router = express.Router()
router.post('/addtocart', auth, addtoCart) // add product to cart
router.get('/getcart-items', auth, getItems) // retreive cart products

export default router;
