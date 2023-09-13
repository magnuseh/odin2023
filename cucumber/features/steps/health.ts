import { Given, When, Then, AfterAll } from "@cucumber/cucumber"
import { WireMockAPI } from 'wiremock-captain';
import { getHealth, getYrHealth } from "./api/sut"
import { assert } from "chai"

const WIREMOCK_HOST = process.env.WIREMOCK_HOST || 'https://localhost:8443'

interface HealthStatus {
    status: string
}
let healthStatus: HealthStatus | undefined = undefined
let yrHealthStatus: HealthStatus | undefined = undefined
let wiremock: WireMockAPI | undefined

AfterAll(() => {
    wiremock?.clearAllExceptDefault()
})

Given('at applikasjonen kjører', () => {
    return true
})

Given('at Yr returnerer status OK', function () {  
    wiremock = new WireMockAPI(WIREMOCK_HOST, '/weatherapi/locationforecast/2.0/status', 'GET')
    wiremock.register(
        {},
        { status: 200, body: { "last_update": "2023-09-11T20:43:10Z" } }
    )
})

Given('at Yr ikke returnerer status OK', function () {
    wiremock = new WireMockAPI(WIREMOCK_HOST, '/weatherapi/locationforecast/2.0/status', 'GET')
    wiremock.register(
        {},
        { status: 500 }
    )
})

When('jeg kaller helsesjekk for applikasjonen', async function () {
    this.response = await getHealth()
})

When('jeg kaller helsesjekk for Yr', async function () {
    this.response = await getYrHealth()
})

Then('skal den returnere status for applikasjonen: {string}', async function (status: string) {
    let health = this.response.body as HealthStatus
    assert.equal(health.status, status)
})

Then('skal den returnere status for Yr: {string}', async function (status: string) {
    let yrHealth = this.response.body as HealthStatus
    assert.equal(yrHealth.status, status)
})
