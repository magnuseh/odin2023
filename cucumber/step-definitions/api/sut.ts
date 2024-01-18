const SUT_BASE_URL = 'http://localhost:3000'

export interface Response {
    status: number,
    statusText: string,
    body: any
}

export interface Coordinates {
    lat: number,
    lon: number
}

export let response: Response | undefined

async function doRequest(url: string, reqParams: RequestInit,
    urlParams: URLSearchParams | undefined = undefined): Promise<Response> {

    let reqUrl = url
    if (urlParams !== undefined) {
        reqUrl += '?'+ urlParams
    }
    console.log('Request to SUT --->')
    console.log('Request URL:', reqUrl)
    console.log('Request parameters:', reqParams)
    const response = await fetch(reqUrl, reqParams);
    const responseStatus = response.status + ' ' + response.statusText

    console.log('Response status:', responseStatus)
    let responseBody = undefined
    if (reqParams.method !== 'DELETE') {
        try {
            responseBody = await response.json()
            // console.log('Response body:', JSON.stringify(responseBody, null, 4));
        }
        catch(e) {
            console.log('Response body:', e)
        }
    }
    console.log('<---')

    return { 
        status: response.status, 
        statusText: response.statusText,
        body: responseBody
    }
}

export async function addLocation(name: string, coordinates: Coordinates) {
    return await doRequest(SUT_BASE_URL + '/locations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name: name, coordinates: coordinates })
    })
}

export async function deleteLocation(locationName: string) {
    return await doRequest(SUT_BASE_URL + '/locations/' + locationName, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
}

export async function getLocations() {
    return await doRequest(SUT_BASE_URL + '/locations', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}

export async function getLocation(locationName: string) {
    return await doRequest(SUT_BASE_URL + '/locations/' + locationName, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}

export async function getHealth() {
    return await doRequest(SUT_BASE_URL + '/health', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }
    )
}

export async function getYrHealth() {
    return await doRequest(SUT_BASE_URL + '/health/yr', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }
    )
}

export async function getWeather(locationName: string) {
    return await doRequest(SUT_BASE_URL + '/weather/' + locationName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }
    )
}