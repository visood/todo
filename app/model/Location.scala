/*
 Location on earth
 */

package model

import play.api.libs.json.Json

case class Location(
  city: String,
  zone: String,
  latitude: Double,
  longitude: Double
)
object Location {
  implicit val writes =
    Json.writes[Location]

  def zoneID(location: Location): String =
    s"${location.zone}/${location.city}"
}

