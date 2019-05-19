import controllers.{Application, AssetsComponents}
import play.api.ApplicationLoader.Context
import play.api._
import play.api.routing.Router
import router.Routes
import com.softwaremill.macwire._
import play.api.libs.ws.ahc.AhcWSComponents

import service.{SunService, WeatherService}

class AppApplicationLoader extends ApplicationLoader
{
  def load(context: Context) = {
    LoggerConfigurator(context.environment.classLoader)
      .foreach{ configurator=>
        configurator.configure(context.environment)
      }
      (new BuiltInComponentsFromContext(context) with AppComponents).application
  }
}

trait AppComponents
    extends BuiltInComponents
    with AhcWSComponents
    with AssetsComponents {
  //lazy val assets: Assets = wire[Assets]
  lazy val prefix: String = "/"
  lazy val router: Router = wire[Routes]
  lazy val applicationController = wire[Application]
  lazy val sunService = wire[SunService]
  lazy val weatherService = wire[WeatherService]
  lazy val httpFilters = Seq()
}


