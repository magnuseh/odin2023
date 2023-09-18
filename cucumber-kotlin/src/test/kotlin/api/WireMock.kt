package api

import com.github.tomakehurst.wiremock.client.WireMock
import com.github.tomakehurst.wiremock.client.WireMockBuilder

object WireMock {
    private val wireMock = WireMockBuilder()
        .scheme("https")
        .host("localhost")
        .port(8443)
        .build();

    fun get(): WireMock { return wireMock }
}