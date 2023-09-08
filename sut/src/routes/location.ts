import { Router } from 'express'
import { createLocation, deleteLocation, getLocation, listLocations } from '../controllers/location'

const router = Router()
router.get('/', listLocations)
router.get('/:name', getLocation)
router.post('/', createLocation)
router.delete('/:name', deleteLocation)

export default router