import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { addtoCart, deleteItem, emptyCart, getItems } from '../controllers/cart'


const router = express.Router()
router.post('/addtocart', auth, addtoCart) // add product to cart
router.get('/get-items', auth, getItems) // retreive cart products
router.delete('/delete-product', auth, deleteItem) // delete a specific product from cart 
router.delete('/empty-cart', auth, emptyCart) // empty the cart

export default router;
