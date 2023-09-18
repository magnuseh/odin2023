package stepdefinitions

import io.cucumber.java8.No
import org.hamcrest.Matchers.*

import World
import api.Coordinates
import api.SUT

@Suppress("unused")
class LocationsStepDefs(private val world: World): No {

    init {
        Gitt("at jeg( allerede) har registrert en lokasjon ved navn {string}") { navn: String ->
            val locations = SUT.getLocations().jsonPath().getList<String>("name")
            if (!locations.contains(navn)) {
                SUT.addLocation(navn, Coordinates(1, 2))
                    .then().statusCode(200)
            }
        }

        Gitt("at jeg( allerede) har registrert en lokasjon ved navn {string} og koordinater {int} {int}") {
            navn: String, lat: Int, lon: Int ->

            val locations = SUT.getLocations().jsonPath().getList<String>("name")
            if (!locations.contains(navn)) {
                SUT.addLocation(navn, Coordinates(lat, lon))
                    .then().statusCode(200)
            }

        }

        Gitt("at jeg ikke har registrert en lokasjon ved navn {string}") { navn: String ->
            val locations = SUT.getLocations().jsonPath().getList<String>("name")
            if (locations.contains(navn)) {
                SUT.deleteLocation(navn).then().statusCode(200)
            }
        }

        Når("jeg henter informasjon om lokasjon {string}") { navn: String ->
            world.response = SUT.getLocation(navn)
        }

        Når("jeg registrerer( enda) en lokasjon ved navn {string}") { navn: String ->
            world.response = SUT.addLocation(navn, Coordinates(12, 34))
        }

        Når("jeg( forsøker å) slette(r) lokasjon {string}") { navn: String ->
            world.response = SUT.deleteLocation(navn)
        }

        Og("listen over registrerte lokasjoner skal inneholde {string}") { navn: String ->
            SUT.getLocations().then().body("name", hasItem(navn))
        }

        Og("listen over registrerte lokasjoner skal ikke inneholde {string}") { navn: String ->
            SUT.getLocations().then().body("name", not(hasItem(navn)))
        }
    }
}
