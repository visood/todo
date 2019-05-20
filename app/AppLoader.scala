import scala.concurrent.Future
import controllers.{Application, AssetsComponents}
import play.api.ApplicationLoader.Context
import play.api._
import play.api.routing.Router
import router.Routes
import com.softwaremill.macwire._
import play.api.libs.ws.ahc.AhcWSComponents
import play.api.mvc.{Filter, EssentialFilter}

import service.{SunService, WeatherService}
import filter.{ExampleFilter, StatsFilter}

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
  lazy val exampleFilter: EssentialFilter = wire[ExampleFilter]
  lazy val statsFilter: Filter = wire[StatsFilter]
  override val httpFilters = Seq(exampleFilter, statsFilter)

  /*
   Manage application lifecycle.
   "stop hook" will be executed when the application gets a stop signal.
   onStart below is a hack. A non-lazy 'val' will be created when a class 
   extended with this trait is initialized. In the code below, that means the
   code in the definition of 'onStart' will run...
   */
  applicationLifecycle.addStopHook{ () =>
    Logger.info("The app will stop.")
    Future.successful(Unit)}
  val onStart = {
    Logger.info("The app will start.")}
}



