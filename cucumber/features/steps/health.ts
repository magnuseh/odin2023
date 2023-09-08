import { Given, When, Then } from "@cucumber/cucumber"
import { getHealth, getYrHealth } from "./api/sut"
import { assert } from "chai"

interface HealthStatus {
    status: string
}
let healthStatus: HealthStatus | undefined = undefined
let yrHealthStatus: HealthStatus | undefined = undefined

Given('at applikasjonen kjører', () => {
    return true
})

Given('at Yr returnerer status OK', function () {
    return 'pending'
});

Given('at Yr ikke returnerer status OK', function () {
    return 'pending'
});

When('jeg kaller helsesjekk for applikasjonen', async function () {
    this.healthStatus = (await getHealth()).body as HealthStatus
})

When('jeg kaller helsesjekk for Yr', async function () {
    this.yrHealthStatus = (await getYrHealth()).body as HealthStatus
})

Then('skal den returnere status for applikasjonen: {string}', async function (status: string) {
    let health = this.healthStatus as HealthStatus
    assert.equal(health.status, status)
})

Then('skal den returnere status for Yr: {string}', async function (status: string) {
    let yrHealth = this.yrHealthStatus as HealthStatus
    assert.equal(yrHealth.status, status)
})