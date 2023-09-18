import api.WireMock
import io.restassured.response.Response

class World {
    lateinit var response: Response
    val wiremock = WireMock.get()
}