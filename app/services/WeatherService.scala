package service
import play.api.libs.ws._
import scala.concurrent.Future

import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

import model.Location

class WeatherService(wsClient: WSClient) {
  val queryURL = "http://api.openweathermap.org/data/2.5/weather?"
  val appid = "da87f848cd1329bf98f8f52b62c511a3"
  def getTemperature(
    location: Location
  ): Future[Double] =
    wsClient
      .url(
        queryURL +
          s"&lat=${location.latitude}" +
          s"&lon=${location.longitude}" +
          s"&APPID=$appid")
      .get()
      .map{response =>
        (response.json\ "main" \ "temp").as[Double]
      }
}
