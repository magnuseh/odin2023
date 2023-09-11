import { RequestHandler } from "express"
import { addLocation, getLocations, getLocationByName, removeLocation, Coordinates } from "../models/location"

export const listLocations: RequestHandler = (req, res, next) => {
    res.json(getLocations())
}

export const getLocation: RequestHandler = (req, res, next) => {
    const locationName = req.params.name as string
    const location = getLocationByName(locationName)
    if (location === undefined) {
        res.status(404).send({ message: `Unknown location: '${locationName}'` })
        return
    }
    res.json(location)
}

export const createLocation: RequestHandler = (req, res, next) => {
    const locationName = req.body.name as string
    const locationCoordinates = req.body.coordinates as Coordinates
    if (getLocationByName(locationName)) {
        res.status(409).send({ message: `A location named '${locationName}' is already registered` })
        return
    }
    const location = addLocation(locationName, locationCoordinates)
    if (location === undefined) {
        res.status(500).send({ message: 'Error adding location' })
        return
    }
    res.json(location)
}

export const deleteLocation: RequestHandler = (req, res, next) => {
    const locationName = req.params.name as string
    const location = getLocationByName(locationName)
    if (!getLocationByName(locationName)) {
        res.status(404).send({ message: `Unknown location: '${locationName}'` })
        return
    }
    if (!removeLocation(locationName)) {
        res.status(500).send({ message: 'Error removing location' })
        return
    }
    res.json()
}
