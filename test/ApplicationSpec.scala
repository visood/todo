import java.time.format.DateTimeFormatter
import java.time.{Instant, ZoneId, ZonedDateTime}

import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play._
import org.scalatest.concurrent._
import org.mockito.Mockito._
import play.api.libs.json.Json
import play.api.libs.ws.ahc.AhcWSRequest
import play.api.libs.ws.{WSClient, WSResponse}
import scala.concurrent.Future

import service.SunService
import model.Location

class ApplicationSpec
    extends PlaySpec
    with MockitoSugar
    with ScalaFutures {
  "DataTimeFormat" must {
    "begin epoch with 1970" in {
      val beginning =
        ZonedDateTime.ofInstant(
          Instant.ofEpochMilli(0),
          ZoneId.systemDefault())
      val formattedYear =
        beginning.format(
          DateTimeFormatter.ofPattern("YYYY"))
      formattedYear mustBe "1970"
    }
  }
  "SunService" must {
    "retreive correct sunset and sunrise information" in {
      val wsClientStub = mock[WSClient]
      val wsRequestStub = mock[AhcWSRequest]
      val wsResponseStub = mock[WSResponse]

      val responseExpected = """
             {
                "results":{
                  "sunrise":"2016-04-14T20:18:12+00:00",
                  "sunset": "2016-04-15T07:31:52+00:00"
                }
             }
      """
      val jsonResult = Json.parse(responseExpected)

      val location =
        Location(
          city = "Sydney",
          zone = "Australia",
          latitude = -33.8830,
          longitude = 151.2167)
      val url = "http://api.sunrise-sunset.org/" +
        s"json?lat=${location.latitude}&lng=${location.longitude}&formatted=0"

      when(wsResponseStub.json)
        .thenReturn(jsonResult)
      when(wsRequestStub.get())
        .thenReturn(
          Future.successful(wsResponseStub))
      when(wsClientStub.url(url))
        .thenReturn(wsRequestStub)

      val sunService =
        new SunService(wsClientStub)
      val resultF =
        sunService
          .getSunInfo(location)

      whenReady(resultF) {suninfo =>
        suninfo.sunrise mustBe "06:18:12"
        suninfo.sunset mustBe "17:31:52"}
    }
  }
}
