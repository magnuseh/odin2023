import { When, Then } from "@cucumber/cucumber"
import { getWeather, Response } from "./api/sut"
import { assert } from "chai"

When('jeg henter værmelding for {string}', async function(navn: string) {
    this.response = await getWeather(navn) as Response
});

Then('skal applikasjonen returnere statuskode {string}', async function(status: string) {
    let r = this.response as Response
    assert.equal(r.status + ' ' + r.statusText, status)
});