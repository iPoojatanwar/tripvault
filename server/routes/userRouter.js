import express from 'express'
import { getPublicProfile } from '../controllers/tripController.js'
export const userRoute = express.Router()
userRoute.get('/:username/profile', getPublicProfile)
