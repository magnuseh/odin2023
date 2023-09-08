const SUT_BASE_URL = 'http://localhost:3000'

async function doRequest(url: string, reqParams: RequestInit, urlParams: URLSearchParams | undefined = undefined) {
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

    return responseBody
}

export async function getHealth() {
    return await doRequest(SUT_BASE_URL + '/health', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }
    )
}

export async function getYrHealth() {
    return await doRequest(SUT_BASE_URL + '/health/yr', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }
    )
}