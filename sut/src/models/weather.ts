import { YrLocationForecast } from "../yr/yr"
import { Coordinates } from "./location"

export class SimpleWeatherStatus {
    coordinates: Coordinates
    temperature: 'WARM' | 'COLD'
    sky: 'SUNNY' | 'NOT SUNNY'
    constructor(forecast: YrLocationForecast) {
        this.coordinates = { lon: forecast.geometry.coordinates[0], lat: forecast.geometry.coordinates[1] }
        const yrTemperature = forecast.properties.timeseries[0].data.instant.details.air_temperature
        this.temperature = yrTemperature >= 20 ? 'WARM' : 'COLD'

        const yrSymbolCode =  forecast.properties.timeseries[0].data.next_1_hours.summary.symbol_code
        this.sky = (['clearsky_day', 'fair_day'].includes(yrSymbolCode)) ? 'SUNNY' : 'NOT SUNNY'
    }

    get summary(): string {
        if (this.temperature === 'WARM' && this.sky === 'SUNNY') {
            return "The weather is good!"
        }
        else if(this.temperature === 'COLD' && this.sky === 'NOT SUNNY') {
            return "The weather is bad :("
        }
        else {
            return "The weather is OK."
        }
    }
}