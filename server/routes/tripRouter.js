 import express from 'express'
import { createTrip, deleteTrip, getTrip, getTrips, updateTrip } from '../controllers/tripController.js'
import { auth } from '../middleware/authMiddleware.js'

 export const triprouter= express.Router()
 triprouter.post('/',auth,createTrip)
 triprouter.get('/allTrips',auth,getTrips)
 triprouter.get('/:id',auth,getTrip)
 triprouter.put('/:id',auth,updateTrip)
 triprouter.delete('/:id',auth,deleteTrip)