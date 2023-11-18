import express from 'express'
import "dotenv/config"
import { authoriseSeller, createAdmin, loginAdmin, logoutAdmin } from '../controllers/admin'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/admin-signup', createAdmin) // signup
router.post('/admin-login', loginAdmin) // login 
router.put('/authorise-seller', auth, authoriseSeller) // authorise seller
router.post('/admin-logout', auth, logoutAdmin) // logout


export default router