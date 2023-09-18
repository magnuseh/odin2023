import io.cucumber.core.options.Constants
import org.junit.platform.suite.api.*

@Suite
@SelectClasspathResource("features")
@ConfigurationParameters(
    ConfigurationParameter(key = Constants.PLUGIN_PROPERTY_NAME, value="pretty, html:target/cucumber-report.html")
)

@ExcludeTags("Disabled")
class RunCucumberTest
