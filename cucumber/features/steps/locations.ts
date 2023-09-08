import { Given, When, Then } from "@cucumber/cucumber"
import { addLocation, getLocations, deleteLocation, Response, getLocation } from "./api/sut"
import { assert } from "chai"

interface Location {
    name: string
}

let location: Response | undefined

Given('at jeg har registrert en lokasjon ved navn {string}', async function (navn: string) {
    const locations: Location[] = (await getLocations()).body
    if (locations.find((loc) => loc.name == navn) === undefined) {
        return (await addLocation(navn, { lat: 12, lon: 34 })).status === 200
    }
    return true
});

Given('at jeg ikke har registrert en lokasjon ved navn {string}', async function (navn: string) {
    const locations: Location[] = (await getLocations()).body
    if (locations.find((loc) => loc.name == navn) !== undefined) {
        return (await deleteLocation(navn)).status === 200
    }
    return true
});


When('jeg henter informasjon om lokasjon {string}', async function (navn: string) {
    this.response = await getLocation(navn) as Response
    this.location = this.response.body as Location
});

When('jeg registrerer( enda) en lokasjon ved navn {string}', async function (navn: string) {
    await addLocation(navn, { lat: 12, lon: 34 })
});

When('jeg( forsøker å) slette(r) lokasjon {string}', async function (navn: string) {
    await deleteLocation(navn)
});

Then('listen over registrerte lokasjoner skal inneholde {string}', async function (navn: string) {
    const locations: Location[] = (await getLocations()).body
    assert.isUndefined(locations.find((loc) => loc.name == navn))
});

Then('listen over registrerte lokasjoner skal ikke inneholde {string}', async function (navn: string) {
    const locations: Location[] = (await getLocations()).body
    assert.isTrue(locations.find((loc) => loc.name == navn))
});