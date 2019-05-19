package service
import play.api.libs.ws._
import scala.concurrent.Future

import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

class WeatherService(wsClient: WSClient) {
  val queryURL = "http://api.openweathermap.org/data/2.5/weather?"
  val appid = "da87f848cd1329bf98f8f52b62c511a3"
  def getTemperature(
    latitude: Double,
    longitude: Double
  ): Future[Double] =
    wsClient
      .url(
        queryURL +
          "&lat=" + latitude +
          "&lon=" + longitude +
          "&APPID=" + appid)
      .get()
      .map{response =>
        (response.json\ "main" \ "temp").as[Double]
      }
}
