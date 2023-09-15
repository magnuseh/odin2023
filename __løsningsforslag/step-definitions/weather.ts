import { Given, When, Then, After } from "@cucumber/cucumber"
import { getWeather, Response } from "./api/sut"
import { assert } from "chai"
import wiremock from "./util/wiremock";
import { IWireMockRequest, IWireMockResponse } from "wiremock-captain";

After(async function() {
    await wiremock.clearAll()
})

Given('at Yr returnerer OK ved henting av værdata for koordinater {int} {int}', async function (lat: number, lon: number) {

    let mockData =  {
        geometry: {
            coordinates: [1, 2, 3]
        },
        properties: {
            timeseries: [{
                data: {
                    instant: {
                        details: {
                            air_temperature: 20
                        }
                    },
                    next_1_hours: {
                        summary: {
                            symbol_code: 'clearsky_day'
                        }
                    }
                }
            }]
        }
    }

    let mockRequest: IWireMockRequest = { method: 'GET', endpoint: `/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}` }
    let mockResponse: IWireMockResponse = { status: 200, body: mockData }
    await wiremock.register(mockRequest, mockResponse)
})

Given('at Yr returnerer en feilkode ved henting av værdata for koordinater {int} {int}', async function (lat: number, lon: number) {
    let mockRequest: IWireMockRequest = { method: 'GET', endpoint: `/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}` }
    let mockResponse: IWireMockResponse = { status: 500 }
    await wiremock.register(mockRequest, mockResponse)
})

When('jeg henter værmelding for {string}', async function(navn: string) {
    this.response = await getWeather(navn) as Response
})

Then('skal applikasjonen returnere statuskode {string}', function(status: string) {
    let r = this.response as Response
    assert.equal(r.status + ' ' + r.statusText, status)
})
