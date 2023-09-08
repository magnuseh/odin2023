const SUT_BASE_URL = 'http://localhost:3000'

export interface Response {
    status: number,
    statusText: string,
    body: any
}

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

    if (!response.ok) {
        throw new Error('Error! Status: ' + responseStatus);
    }
    console.log('Response status:', responseStatus)
    const responseBody = await response.json()
    console.log('Response body:', JSON.stringify(responseBody, null, 4));
    console.log('<---')

    return { 
        status: response.status, 
        statusText: response.statusText,
        body: responseBody
    }
}

export async function addLocation(locationName: string) {
    return await doRequest(SUT_BASE_URL + '/locations', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
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