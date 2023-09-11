import { Router } from 'express'
import { getWeather } from '../controllers/weather'

const router = Router()
router.get('/:locationName', getWeather)

export default router
