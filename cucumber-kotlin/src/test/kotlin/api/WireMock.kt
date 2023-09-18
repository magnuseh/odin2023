package api

import com.github.tomakehurst.wiremock.client.WireMock
import com.github.tomakehurst.wiremock.client.WireMockBuilder

val wiremockScheme: String = System.getProperty("wiremock.scheme", "https")
val wiremockHost: String = System.getProperty("wiremock.host", "localhost")
val wiremockPort: Int = System.getProperty("wiremock.port", "8443").toInt()

object WireMock {
    private val wireMock = WireMockBuilder()
        .scheme(wiremockScheme)
        .host(wiremockHost)
        .port(wiremockPort)
        .build();

    fun get(): WireMock { return wireMock }
}