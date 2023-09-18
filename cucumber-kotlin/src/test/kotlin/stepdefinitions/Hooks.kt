package stepdefinitions

import io.cucumber.java8.No

import api.WireMock

@Suppress("unused")
class Hooks: No {
    init {
        Before() { _ ->
            WireMock.get().removeMappings()
        }
    }
}
