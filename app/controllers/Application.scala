package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.ws._
import play.api.Play.current
//import java.util.Date
import java.text.SimpleDateFormat
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import org.joda.time.{DateTimeZone, DateTime}
import org.joda.time.format.DateTimeFormat

import akka.actor.ActorSystem
import akka.util.Timeout
import akka.pattern.ask

import java.util.concurrent.TimeUnit

import service.{SunService, WeatherService}
import actor.StatsActor

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */

class Application @Inject()(
  sunService: SunService,
  weatherService: WeatherService,
  actorSystem: ActorSystem
) extends Controller() {
  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() =
    Action.async { implicit request: Request[AnyContent] =>
      /*
       val date = new Date()
       val dateStr = new SimpleDateFormat().format(date)
       Future.successful { Ok(views.html.index(dateStr)) }
       */
      implicit val timeout =
        Timeout(5, TimeUnit.SECONDS)
      val requestsF = (
        actorSystem.actorSelection(StatsActor.path) ? StatsActor.GetStats
      ).mapTo[Int]

      val latitude = 46.5517
      val longitude = 6.5586
      for {
        sunInfo     <- sunService.getSunInfo(latitude, longitude)
        temperature <- weatherService.getTemperature(latitude, longitude)
        requests <- requestsF
      } yield {
        Ok(views.html.index(sunInfo, temperature, requests))
      }
    }
}
