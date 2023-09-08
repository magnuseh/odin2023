import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'

import healthRoutes from './routes/health'
import locationRoutes from './routes/location'
import weatherRoutes from './routes/weather'

const app = express()

app.use(json())

app.use('/health', healthRoutes)
app.use('/locations', locationRoutes)
app.use('/weather', weatherRoutes)
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

app.listen(3000)
