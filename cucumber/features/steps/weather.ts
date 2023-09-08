import { Given, When, Then } from "@cucumber/cucumber"
import { addLocation, deleteLocation, getLocations, getWeather, Response } from "./api/sut"
import { assert } from "chai"

interface Location {
    name: string
}

let response: Response | undefined

Given('at jeg har registrert en lokasjon ved navn {string}', async (navn: string) => {
    const locations: Location[] = (await getLocations()).body
    if (locations.find((loc) => loc.name == navn) === undefined) {
        return (await addLocation(navn)).status === 200
    }
    return true
});

Given('at jeg ikke har registrert en lokasjon ved navn {string}', async (navn: string) => {
    const locations: Location[] = (await getLocations()).body
    if (locations.find((loc) => loc.name == navn) !== undefined) {
        return (await deleteLocation(navn)).status === 200
    }
    return true
});

When('jeg henter værmelding for {string}', async (navn: string) => {
    response = await getWeather(navn)
});

Then('skal applikasjonen returnere statuskode {string}', async (status: string) => {
    assert.equal(response?.status + ' ' + response?.statusText, status)
});