import { Given, When, Then } from "@cucumber/cucumber"
import { getHealth } from "./api/sut"
import { assert } from "chai"

interface HealthStatus {
    status: string
}
let healthStatus: HealthStatus | undefined = undefined

Given('at applikasjonen kjører', () => {
    return true
})

When('jeg kaller helsesjekk for applikasjonen', async () => {
    healthStatus = await getHealth()
})

Then('skal den returnere status {string}', (status) => {
    assert.equal(healthStatus?.status, status)
})