import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'

import testRoutes from './routes/test'

const app = express()

app.use(json())

app.use('/test', testRoutes)
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

app.listen(3000)
