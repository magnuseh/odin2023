package stepdefinitions

import com.github.tomakehurst.wiremock.client.WireMock.*
import io.cucumber.java8.No
import io.restassured.http.ContentType
import org.hamcrest.Matchers.equalTo

import World
import api.SUT
import io.cucumber.java8.PendingException

const val WEATHER_API_STATUS_ENDPOINT = "/weatherapi/locationforecast/2.0/status"

@Suppress("unused")
class HealthStepDefs(private val world: World) : No {

    init {
        Gitt("at applikasjonen kjører") {
            true
        }

        Gitt("at Yr returnerer status OK") {
            world.wiremock.register(
                get(WEATHER_API_STATUS_ENDPOINT)
                    .willReturn(
                        okJson("{ \"last_update\": \"2023-09-11T20:43:10Z\" }")
                    )
            )
        }

        Gitt("at Yr ikke returnerer status OK") {
            throw PendingException()
        }

        Når("jeg kaller helsesjekk for applikasjonen") {
            world.response = SUT.getHealth()
        }

        Når("jeg kaller helsesjekk for Yr") {
            world.response = SUT.getYrHealth()
        }

        Så("skal den returnere status for applikasjonen: {string}") { status: String ->
            world.response.then()
                .contentType(ContentType.JSON)
                .body("status", equalTo(status))
        }

        Så("skal den returnere status for Yr: {string}") { status: String ->
            world.response.then()
                .contentType(ContentType.JSON)
                .body("status", equalTo(status))
        }
    }
}
