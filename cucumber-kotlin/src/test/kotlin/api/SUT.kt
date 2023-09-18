package api

import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.restassured.RestAssured.`when`
import io.restassured.http.ContentType
import io.restassured.response.Response

data class Coordinates(val lat: Int, val lon: Int)

class SUT {
    companion object {
        init {
            RestAssured.baseURI = "http://localhost:3000"
        }

        fun addLocation(name: String, coordinates: Coordinates): Response {
            val jsonAsMap = mapOf(
                "name" to name,
                "coordinates" to mapOf(
                    "lat" to coordinates.lat,
                    "lon" to coordinates.lon
                )
            )
            return given()
                    .contentType(ContentType.JSON)
                    .body(jsonAsMap)
                .`when`()
                    .post("/locations")
        }

        fun deleteLocation(locationName: String): Response {
            return given()
                    .pathParam("locationName", locationName)
                .`when`()
                    .delete("/locations/{locationName}")
        }

        fun getLocations(): Response {
            return `when`().get("/locations")
        }

        fun getLocation(locationName: String): Response {
            return given()
                    .pathParam("locationName", locationName)
                .`when`()
                    .get("/locations/{locationName}")
        }

        fun getHealth(): Response {
            return `when`().get("/health")
        }

        fun getYrHealth(): Response {
            return `when`().get("/health/yr")
        }

        fun getWeather(locationName: String): Response {
            return given()
                    .pathParam("locationName", locationName)
                .`when`()
                    .get("/weather/{locationName}")

        }
    }
}
