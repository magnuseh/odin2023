import { URLSearchParams } from "url"
import { Coordinates } from "../models/location"

const YR_API_BASE_URL = 'https://api.met.no'
const YR_API_STATUS_PATH = '/weatherapi/locationforecast/2.0/status'
const YR_API_FORECAST_PATH = '/weatherapi/locationforecast/2.0/compact'

const sitename = 'https://github.com/magnuseh/'

export interface YrStatus {
    last_update: Date
}

export interface YrGeometry {
    type: 'Point',
    coordinates: [number, number, number]
}

export interface YrTimeseriesData {
    time: Date,
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

export interface YrLocationForecast {
    geometry: YrGeometry
    properties: {
        timeseries: YrTimeseriesData[]
    }
}

async function doRequest(url: string, reqParams: RequestInit, urlParams: URLSearchParams | undefined = undefined) {
    let reqUrl = url
    if (urlParams !== undefined) {
        reqUrl += '?'+ urlParams
    }
    console.log('Request to Yr --->')
    console.log('Request URL:', reqUrl)
    console.log('Request parameters:', reqParams)
    const response = await fetch(reqUrl, reqParams);
    const responseStatus = response.status + ' ' + response.statusText

    if (!response.ok) {
        throw new Error('Error! Status: ' + responseStatus);
    }
    console.log('Response status:', responseStatus)
    const responseBody = await response.json()
    //console.log('Response body:', JSON.stringify(responseBody, null, 4));
    console.log('<---')

    return responseBody
}

export async function getStatus(): Promise<YrStatus> {
    return await doRequest(YR_API_BASE_URL + YR_API_STATUS_PATH, {
            method: 'GET',
            headers: {
                'User-Agent': sitename,
                'Accept': 'application/json',
            },
        }
    )
}

export async function getLocationForecast(coordinates: Coordinates): Promise<YrLocationForecast> {
    return await doRequest(
        YR_API_BASE_URL + YR_API_FORECAST_PATH,
        {
            method: 'GET',
            headers: {
            'User-Agent': sitename,
            'Accept': 'application/json',
            },
        },
        new URLSearchParams({ lat: `${coordinates.lat}`, lon: `${coordinates.lon}` })
    )
}