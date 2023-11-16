import express from 'express'
import "dotenv/config"
import { createUser, loginUser, logoutUser } from '../controllers/user'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/signup', createUser) // signup
router.post('/login', loginUser) // login 
router.post('/logout', auth, logoutUser) // logout

export default router