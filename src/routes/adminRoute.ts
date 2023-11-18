import express from 'express'
import "dotenv/config"
import { createAdmin } from '../controllers/admin'

const router = express.Router()

router.post('/admin-signup', createAdmin) // signup
// router.post('/admin-login', loginUser) // login 
// router.post('/admin-logout', auth, logoutUser) // logout


export default router