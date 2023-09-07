import { Router } from 'express'
import { getHealth, getHealthYr } from '../controllers/health'

const router = Router()
router.get('/', getHealth)
router.get('/yr', getHealthYr)

export default router