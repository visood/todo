package service
import play.api.libs.ws._
import scala.concurrent.Future
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

import org.joda.time.{DateTimeZone, DateTime}
import org.joda.time.format.DateTimeFormat

import model.SunInfo

class SunService(wsClient: WSClient) {

  def queryURL(latitude: Double, longitude: Double): String =
    "http://api.sunrise-sunset.org/json?" + 
      s"lat=$latitude&lng=$longitude&formatted=0"

  def getSunInfo(latitude: Double, longitude: Double ): Future[SunInfo] =
    wsClient
      .url(
        queryURL(latitude, longitude))
      .get()
      .map {response =>
        val json =
          response.json
        val sunriseTime =
          DateTime.parse(
            (json \ "results" \ "sunrise").as[String])
        val sunsetTime  =
          DateTime.parse(
            (json \ "results" \ "sunset").as[String])
        val formatter =
          DateTimeFormat
            .forPattern("HH:mm:ss")
            .withZone(DateTimeZone.forID("Europe/Zurich"))
        SunInfo(
          formatter.print(sunriseTime),
          formatter.print(sunsetTime))
      }
}
