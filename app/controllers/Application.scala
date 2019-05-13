package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.ws._
import play.api.Play.current
import java.util.Date
import java.text.SimpleDateFormat
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

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
  def index() = Action.async { implicit request: Request[AnyContent] =>
    /*
    val date = new Date()
    val dateStr = new SimpleDateFormat().format(date)
    Future.successful { Ok(views.html.index(dateStr)) }
     */

    val responseF =
      ws.url(
        "http://api.sunrise-sunset.org/json?lat=46.5517&lng=6.5586&formatted=0"
      ).get()
    responseF.map { response =>
      Ok(views.html.index(
           SunInfo(
             (response.json \ "results" \ "sunrise").as[String],
             (response.json \ "results" \ "sunset").as[String]
           )
         )
      )
    }
  }
}
