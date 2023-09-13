import { URLSearchParams } from "url"
import { Coordinates } from "../models/location"

const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL || 'https://api.met.no'
const WEATHER_API_STATUS_PATH = '/weatherapi/locationforecast/2.0/status'
const WEATHER_API_FORECAST_PATH = '/weatherapi/locationforecast/2.0/compact'
const WEATHER_API_USERAGENT = 'https://github.com/magnuseh/'

export interface WeatherApiStatus {
    last_update: Date
}

export interface WeatherApiGeometry {
    coordinates: [number, number, number]
}

export interface WeatherApiTimeseriesData {
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

export interface WeatherApiLocationForecast {
    geometry: WeatherApiGeometry
    properties: {
        timeseries: WeatherApiTimeseriesData[]
    }
}

async function doRequest(url: string, reqParams: RequestInit, urlParams: URLSearchParams | undefined = undefined) {
    let reqUrl = url
    if (urlParams !== undefined) {
        reqUrl += '?'+ urlParams
    }
    console.log('Request to Weather API --->')
    console.log('Request URL:', reqUrl)
    console.log('Request parameters:', reqParams)
    const response = await fetch(reqUrl, reqParams);
    const responseStatus = response.status + ' ' + response.statusText

    if (!response.ok) {
        throw new Error('Error! Status: ' + responseStatus)
    }
    console.log('Response status:', responseStatus)
    const responseBody = await response.json()
    console.log('Response body:', JSON.stringify(responseBody, null, 4))
    console.log('<---')

    return responseBody
}

export async function getStatus(): Promise<WeatherApiStatus> {
    return await doRequest(WEATHER_API_BASE_URL + WEATHER_API_STATUS_PATH, {
            method: 'GET',
            headers: new Headers({
                'Accept'       : 'application/json',
                'User-Agent'   : WEATHER_API_USERAGENT
            })
        }
    )
}

export async function getLocationForecast(coordinates: Coordinates): Promise<WeatherApiLocationForecast> {
    return await doRequest(
        WEATHER_API_BASE_URL + WEATHER_API_FORECAST_PATH,
        {
            method: 'GET',
            headers: new Headers({
                'Accept'       : 'application/json',
                'User-Agent'   : WEATHER_API_USERAGENT
            })
        },
        new URLSearchParams({ lat: `${coordinates.lat}`, lon: `${coordinates.lon}` })
    )
}