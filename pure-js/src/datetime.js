var now = function() {
  var currdate = new Date();
  return {
    "year"   : currdate.getFullYear(),
    "month"  : currdate.getMonth() + 1,
    "date"   : currdate.getDate(),
    "day"    : currdate.getDay(),
    "hour"   : currdate.getHours(),
    "minute" : currdate.getMinutes()
  };
};

var show = function(date) {
  var mon = "" + date["month"];
  if (date["month"] < 10) {
    mon = "0" + mon;
  }
  var d = "" + date["date"];
  if (date["date"] < 10) {
    d = "0" + d;
  }
  var min = "" + date["minute"];
  if (date["minute"] < 10) {
    min = "0" + min;
  }
  return date["year"] + "/" + mon + "/" + d + " @ "
    + date["hour"] + ":" + min;
};

module.exports = {
  "now"  :  now,
  "show" : show
};


