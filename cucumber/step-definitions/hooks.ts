import { Before } from "@cucumber/cucumber"
import wiremock from "./util/wiremock";

Before(async function() {
    await wiremock.clearAll()
})
