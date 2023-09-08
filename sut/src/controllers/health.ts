import { json, RequestHandler } from "express"
import { getStatus as getYrStatus, YrStatus } from "../yr/yr"

export const getHealth: RequestHandler = (req, res, next) => {
    res.json({ status: "I'm OK." })
}

export const getHealthYr: RequestHandler = (req, res, next) => {
    getYrStatus().then(() =>
        res.json({ status: 'Yr is OK.' })
    ).catch((error: Error) =>
        res.json({ status: 'Yr is NOT OK! :(', error: error.message })
    )
}