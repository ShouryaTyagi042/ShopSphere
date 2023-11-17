import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { createProduct, createSeller, loginSeller, logoutSeller } from '../controllers/seller'

const router = express.Router()

router.post('/seller-signup', createSeller) // signup
router.post('/seller-login', loginSeller) // login 
router.post('/seller-logout', auth, logoutSeller) // logout
router.post('/create-product', auth, createProduct) // create product

export default router