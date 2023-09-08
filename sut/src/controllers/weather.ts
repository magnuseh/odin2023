import { RequestHandler } from "express"
import { getLocationForecast } from "../yr/yr"
import { UUID } from "crypto"
import { getLocationByName } from "../models/location"
import { SimpleWeatherStatus } from "../models/weather"

export const getWeather: RequestHandler = (req, res, next) => {

    const locationName = req.params.locationName as string
    if (typeof(req.params.locationName) !== 'string') {
        throw new Error("Unable to parse parameter 'locationName'")
    }

    const location = getLocationByName(locationName)

    if (location === undefined) {
        throw new Error(`Unknown location name: ${locationName}`)
    }

    console.log(`Getting the weather @ location '${location.name}'`)
    getLocationForecast(location.coordinates).then((result) => {
        const yrWeatherStatus = new SimpleWeatherStatus(result)
        res.json({
            coordinates: yrWeatherStatus.coordinates,
            temperature: yrWeatherStatus.temperature,
            sky: yrWeatherStatus.sky,
            summary: yrWeatherStatus.summary
        })
    }).catch((error: Error) =>
        res.json({ error: error.message })
    )
}