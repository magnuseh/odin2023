import { Given, When, Then } from "@cucumber/cucumber"
import { WireMockAPI } from 'wiremock-captain';
import { getWeather, Response } from "./api/sut"
import { assert } from "chai"

const WIREMOCK_BASE_URL = process.env.WIREMOCK_BASE_URL || 'https://localhost:8443'

let wiremock: WireMockAPI | undefined

Given('at Yr returnerer OK ved henting av værdata for koordinater {int} {int}', (lat: number, lon: number) => {

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

    wiremock = new WireMockAPI(WIREMOCK_BASE_URL, `/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, 'GET')
    wiremock.register(
        {},
        { status: 200, body: mockData }
    )
})

Given('at Yr returnerer en feilkode ved henting av værdata for koordinater {int} {int}', (lat: number, lon: number) => {
    wiremock = new WireMockAPI(WIREMOCK_BASE_URL, `/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, 'GET')
    wiremock.register(
        {},
        { status: 500 }
    )
})

When('jeg henter værmelding for {string}', async function(navn: string) {
    this.response = await getWeather(navn) as Response
})

Then('skal applikasjonen returnere statuskode {string}', async function(status: string) {
    let r = this.response as Response
    assert.equal(r.status + ' ' + r.statusText, status)
})
