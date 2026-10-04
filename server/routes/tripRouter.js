 import express from 'express'
import { createTrip, deleteTrip,getTrip, getTrips, updateTrip } from '../controllers/tripController.js'
import { auth } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploads.js'
 export const triprouter= express.Router()
 triprouter.post('/',auth, upload.fields([{name:"coverImage",maxCount:1},{name:"photos",maxCount:10}]) ,createTrip)
 triprouter.get('/allTrips',auth,getTrips)
 triprouter.get('/:id',auth,getTrip)
 triprouter.put('/:id',auth,upload.fields([{name:"coverImage",maxCount:1},{name:"photos",maxCount:10}]),updateTrip)
 triprouter.delete('/:id',auth,deleteTrip)
