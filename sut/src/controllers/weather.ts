import { RequestHandler } from "express"
import { SimpleWeatherStatus, YrLocation, getLocationForecast } from "../yr/yr"

const theLocation: YrLocation = { lat: 51.5, lon: 0 }

export const getWeather: RequestHandler = (req, res, next) => {
    console.log('Getting the weather...')
    getLocationForecast(theLocation).then((result) =>

        res.json({
            location: theLocation,
            weather: new SimpleWeatherStatus(result)
        })
    ).catch((error: Error) =>
        res.json({ error: error.message })
    )
}