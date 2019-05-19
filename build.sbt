name := """WaToDoBa"""

organization := "mu2.om"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.7"

pipelineStages := Seq(digest)

libraryDependencies ++= Seq(
  jdbc,
  ehcache,
  ws,
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test,
  "com.softwaremill.macwire" %% "macros" % "2.3.2" % "provided",
  "com.softwaremill.macwire" %% "util" % "2.3.2"
)

resolvers += "scalaz.bintray" at "http://dl.bintray.com/scalaz/releases"
//libraryDependencies += guice
//libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
