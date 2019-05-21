package service
import play.api.libs.ws._
import scala.concurrent.Future
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

import org.joda.time.{DateTimeZone, DateTime}
import org.joda.time.format.DateTimeFormat

import model.{SunInfo, Location}

class SunService(wsClient: WSClient) {

  def queryURL(latitude: Double, longitude: Double): String =
    "http://api.sunrise-sunset.org/json?" + 
      s"lat=$latitude&lng=$longitude&formatted=0"

  def getSunInfo(
    location: Location
  ): Future[SunInfo] =
    wsClient
      .url(
        queryURL(
          location.latitude,
          location.longitude))
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
            .withZone(DateTimeZone.forID(Location.zoneID(location)))
        SunInfo(
          formatter.print(sunriseTime),
          formatter.print(sunsetTime))
      }
}
