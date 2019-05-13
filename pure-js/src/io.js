var fjs = require("./functional.js");

/*
 We can impose restrictions on what constitutes a valid TODO description.
 An example of an invalid string is one that contains only commas, or only
 numbers.
 We return the parsed string and a status indicating its validity ---
 the parsed string, if an invalid description may be pasted in a warning box.
 */
var readDescription = function(s) {
  var ts = s.trim();
  return {
    "text" : ts,
    "valid" : ts != ""
  };
};


/*
 tags are expected to be entered as a comma separated words
 */
var readTags = function(s) {
  return fjs.unique(fjs.filter(
    function(t) {return t != "";},
    s.split(',').map(function(t) { return t.trim(); })
  ));
};


module.exports = {
  "readDescription" : readDescription,
  "readTags"        : readTags
};
