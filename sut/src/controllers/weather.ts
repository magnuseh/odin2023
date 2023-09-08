import { RequestHandler } from "express"
import { SimpleWeatherStatus, YrLocation, getLocationForecast } from "../yr/yr"

const locations: Record<string, YrLocation> = {
    'Greenwich': { lat: 51.5, lon: 0 }
}

export const getWeather: RequestHandler = (req, res, next) => {
    const locationName = req.query.location
    if (typeof(locationName) != 'string') {
        throw new Error("Unable to parse parameter 'location'")
    }
    if (!(locationName in locations )) {
        throw new Error(`Unknown location '${locationName}'`)
    }
    console.log(`Getting the weather @ location '${locationName}'`)
    getLocationForecast(locations[locationName]).then((result) => {

        const yrWeatherStatus = new SimpleWeatherStatus(result)
        res.json({
            location: yrWeatherStatus.location,
            weather: yrWeatherStatus.weather
        })
    }).catch((error: Error) =>
        res.json({ error: error.message })
    )
}