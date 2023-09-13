import { RequestHandler } from "express"
import { getLocationForecast } from "../weatherapi/weatherapi"
import { UUID } from "crypto"
import { getLocationByName } from "../models/location"
import { SimpleWeatherStatus } from "../models/weather"

export const getWeather: RequestHandler = (req, res, next) => {

    const locationName = req.params.locationName as string
    if (typeof(req.params.locationName) !== 'string') {
        res.status(400).json({ message: `Unable to parse parameter 'locationName'` })
        return
    }

    const location = getLocationByName(locationName)
    if (location === undefined) {
        res.status(404).json({ message: `Unknown location: '${locationName}'` })
        return
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
    }).catch((error: Error) => {
        console.log(error)
        res.status(500).json({ error: error.message })
    })
}