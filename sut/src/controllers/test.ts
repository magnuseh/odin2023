import { RequestHandler } from "express"

export const getTest: RequestHandler = (req, res, next) => {
    res.json({message: 'This is a test!'})
}