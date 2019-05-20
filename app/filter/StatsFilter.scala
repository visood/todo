package filter

import scala.concurrent.Future
import akka.actor.ActorSystem
import akka.stream.Materializer
import play.api.Logger
import play.api.mvc.{Result, RequestHeader, Filter}

class StatsFilter(
  implicit val mat: Materializer
) extends Filter {
  override def apply(
    nextFilter: (RequestHeader) => Future[Result]
  )(header: RequestHeader
  ): Future[Result] = {
    Logger.info(s"Another request to serve: ${header.path}")
    nextFilter(header)
  }
}
