import { RequestHandler } from "express"
import { addLocation, getLocations, getLocationByName, removeLocation, Coordinates } from "../models/location"

export const listLocations: RequestHandler = (req, res, next) => {
    res.json(getLocations())
}

export const getLocation: RequestHandler = (req, res, next) => {
    const location = getLocationByName(req.params.name as string)
    if (location === undefined) {
        res.status(404)
    }
    res.json(location)
}

export const createLocation: RequestHandler = (req, res, next) => {
    const location = addLocation(req.body.name as string, req.body.coordinates as Coordinates)
    if (location === undefined) {
        res.status(400)
    }
    res.json(location)
}

export const deleteLocation: RequestHandler = (req, res, next) => {
    res.statusCode = removeLocation(req.params.name as string) ? 200 : 404
    res.json()
}
