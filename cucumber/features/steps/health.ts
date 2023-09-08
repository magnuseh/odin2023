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
    return true
});

Given('at Yr ikke returnerer status OK', function () {
    return true
});

When('jeg kaller helsesjekk for applikasjonen', async () => {
    healthStatus = await getHealth()
})

When('jeg kaller helsesjekk for Yr', async () => {
    yrHealthStatus = await getYrHealth()
})

Then('skal den returnere status for applikasjonen: {string}', (status) => {
    assert.equal(healthStatus?.status, status)
})

Then('skal den returnere status for Yr: {string}', (status) => {
    assert.equal(yrHealthStatus?.status, status)
})