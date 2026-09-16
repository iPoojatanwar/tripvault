import express from 'express'
import { login, me, registerUser } from '../controllers/authController.js'
import { auth } from '../middleware/authMiddleware.js'

export const route= express.Router()
route.post('/register',registerUser)
route.post('/login',login)
route.get('/me',auth,me)