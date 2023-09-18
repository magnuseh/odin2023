package stepdefinitions

import com.github.tomakehurst.wiremock.client.WireMock.*
import io.cucumber.java8.No

import World
import api.SUT

@Suppress("unused")
class WeatherStepDefs(private val world: World): No {

    init {
        Gitt("at Yr returnerer OK ved henting av værdata for koordinater {int} {int}") {
            lat: Int, lon: Int ->

            val mockData = """
                {
                    "geometry": {
                        "coordinates": [1, 2, 3]
                    },
                    "properties": {
                        "timeseries": [{
                            "data": {
                                "instant": {
                                    "details": {
                                        "air_temperature": 20
                                    }
                                },
                                "next_1_hours": {
                                    "summary": {
                                        "symbol_code": "clearsky_day"
                                    }
                                }
                            }
                        }]
                    }
                }""".trimIndent()
            
           world.wiremock.register(
               get("/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}")
                   .willReturn(
                       okJson(mockData)
                   )
           )
        }

        Gitt("at Yr returnerer en feilkode ved henting av værdata for koordinater {int} {int}") {
            lat: Int, lon: Int ->

            world.wiremock.register(
                get("/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}")
                    .willReturn(status(500))
            )
        }

        Når("jeg henter værmelding for {string}") { navn: String ->
            world.response = SUT.getWeather(navn)
        }
    }
}
