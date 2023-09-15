import { Given, When, Then, After } from "@cucumber/cucumber"
import { IWireMockRequest, IWireMockResponse } from 'wiremock-captain';
import { getHealth, getYrHealth } from "./api/sut"
import { assert } from "chai"
import wiremock from "./util/wiremock";

const WEATHER_API_STATUS_ENDPOINT = '/weatherapi/locationforecast/2.0/status'

interface HealthStatus {
    status: string
}

After(async function() {
    await wiremock.clearAll()
})

Given('at applikasjonen kjører', function () {
    return true
})

Given('at Yr returnerer status OK', async function () {
    let mockRequest: IWireMockRequest = { method: 'GET', endpoint: WEATHER_API_STATUS_ENDPOINT }
    let mockResponse: IWireMockResponse = { status: 200, body: { "last_update": "2023-09-11T20:43:10Z" } }
    await wiremock.register(mockRequest, mockResponse)
})

Given('at Yr ikke returnerer status OK', async function () {
    let mockRequest: IWireMockRequest = { method: 'GET', endpoint: WEATHER_API_STATUS_ENDPOINT }
    let mockResponse: IWireMockResponse = { status: 500 }
    await wiremock.register(mockRequest, mockResponse)
})

When('jeg kaller helsesjekk for applikasjonen', async function () {
    this.response = await getHealth()
})

When('jeg kaller helsesjekk for Yr', async function () {
    this.response = await getYrHealth()
})

Then('skal den returnere status for applikasjonen: {string}', function (status: string) {
    let health = this.response.body as HealthStatus
    assert.equal(health.status, status)
})

Then('skal den returnere status for Yr: {string}', function (status: string) {
    let yrHealth = this.response.body as HealthStatus
    assert.equal(yrHealth.status, status)
})
