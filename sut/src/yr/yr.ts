import { url } from "inspector"
import { URLSearchParams } from "url"

const YR_API_BASE_URL = 'https://api.met.no'
const YR_API_STATUS_PATH = '/weatherapi/locationforecast/2.0/status'
const YR_API_FORECAST_PATH = '/weatherapi/locationforecast/2.0/compact'

const sitename = 'https://github.com/magnuseh/'

export interface YrStatus {
    last_update: Date
}

export interface YrLocation {
    lat: number
    lon: number
}

export interface YrLocationForecast {
    properties: {
        timeseries: {
            data: {
                instant: {
                    details: {
                        air_temperature: number
                    }
                }
                next_1_hours: {
                    summary: {
                        symbol_code: string
                    }
                }
            }
        }
    }
}

export class SimpleWeatherStatus {
    temperature: 'WARM' | 'COLD'
    sky: 'SUNNY' | 'NOT SUNNY'
    constructor(forecast: YrLocationForecast) {
        const yrTemperature = forecast.properties.timeseries.data.instant.details.air_temperature
        this.temperature = yrTemperature >= 15 ? 'WARM' : 'COLD'

        const yrSymbolCode =  forecast.properties.timeseries.data.next_1_hours.summary.symbol_code
        this.sky = (yrSymbolCode in ['clearsky_day', 'fair_day']) ? 'SUNNY' : 'NOT SUNNY'
    }

    toString(): string {
        if (this.temperature == 'WARM' && this.sky == 'SUNNY') {
            return 'GOOD'
        }
        else if(this.temperature == 'COLD' && this.sky == 'NOT SUNNY') {
            return 'BAD'
        }
        else {
            return 'OK'
        }
    }
}

export async function getStatus() {
    const response = await fetch(YR_API_BASE_URL + YR_API_STATUS_PATH, {
        method: 'GET',
        headers: {
            'User-Agent': sitename,
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result: YrStatus = (await response.json())

    console.log('yr.getStatus(): ', JSON.stringify(result, null, 4));
    return result;
  }

export async function getLocationForecast(location: YrLocation) {
    const urlParams = new URLSearchParams({ lat: `${location.lat}`, lon: `${location.lon}` })
    const reqUrl = YR_API_BASE_URL + YR_API_FORECAST_PATH + '?' + urlParams
    const reqParams = {
        method: 'GET',
        headers: {
            'User-Agent': sitename,
            'Accept': 'application/json',
        }
    }
    console.log(reqUrl)
    console.log(reqParams)
    const response = await fetch(reqUrl, reqParams);

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result: YrLocationForecast = (await response.json())
    console.log('yr.getLocationForecast(): ', JSON.stringify(result, null, 4));
    return result;
}