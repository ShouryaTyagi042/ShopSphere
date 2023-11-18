import express from 'express'
import "dotenv/config"
import { auth } from '../middleware/auth'
import { createProduct } from '../controllers/product'

const router = express.Router()

router.post('/create-product', auth, createProduct) // create product

export default router