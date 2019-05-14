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
import model.SunInfo

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */

@Singleton
class Application @Inject()(
  ws: WSClient,
  cc: ControllerComponents
) extends AbstractController(cc)
{
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

      val sunResponseF =
        ws.url(
          "http://api.sunrise-sunset.org/json?lat=46.5517&lng=6.5586&formatted=0"
        ).get()
      val weatherResponseF =
        ws.url(
          "http://api.openweathermap.org/data/2.5/weather?" +
            "lat=46.55217&lon=6.5586" +
            "&units=metric" +
            "&APPID=da87f848cd1329bf98f8f52b62c511a3"
        ).get()
      for {
        sunResponse <- sunResponseF
        weatherResponse <- weatherResponseF
      } yield {
        val formatter =
          DateTimeFormat
            .forPattern(
              "HH:mm:ss")
          .withZone(
            DateTimeZone.forID(
              "Europe/Zurich"))
        val sunInfo =
          SunInfo(
            formatter.print(
              DateTime.parse(
                (sunResponse.json \ "results" \ "sunrise").as[String])),
            formatter.print(
              DateTime.parse(
                (sunResponse.json \ "results" \ "sunset").as[String])))
        val temperature =
          (weatherResponse.json \ "main" \ "temp").as[Double]
        Ok(views.html.index(
             sunInfo,
             temperature))
      }
    }
}
