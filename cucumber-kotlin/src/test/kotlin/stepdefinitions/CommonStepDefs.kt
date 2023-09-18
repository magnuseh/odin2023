package stepdefinitions

import io.cucumber.java8.No
import org.hamcrest.Matchers

import World

@Suppress("unused")
class CommonStepDefs(private val world: World): No {
    init {
        Så("skal applikasjonen returnere statuskode {string}") { status: String ->
            world.response.then().statusLine(Matchers.containsString(status))
        }
    }
}