(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
datetime = require("./datetime.js");

//some example data, that may be used to seed the database
//commented out after db already initialized.
//TODO: figure out a way to add this data with a script.

var todos = [
  /*
    {
        "description" : "Get groceries",
        "tags" : ["shopping", "chores"],
        "timed" : datetime.show(datetime.now())
    },
    {
        "description" : "Make up some new ToDos",
        "tags" : ["writing", "work"],
        "timed" : datetime.show(datetime.now())
    },
    {
        "description" : "Apply for jobs",
        "tags" : ["work", "job-search"],
        "timed" : datetime.show(datetime.now())
    },
    {
        "description" : "Review jobs",
        "tags" : ["learn", "job-search"],
        "timed" : datetime.show(datetime.now())
    },
    {
        "description" : "read Mining of Massive Datasets",
        "tags" : ["learn", "work"],
        "timed" : datetime.show(datetime.now())
    },
    {
        "description" : "Meditate",
        "tags" : ["learn", "improvement", "health"],
        "timed" : datetime.show(datetime.now())
    },
    {
        "description" : "Run",
        "tags" : ["improvement", "health"],
        "timed" : datetime.show(datetime.now())
    }
   */
];

module.exports = {
    "todos" : todos
};

},{"./datetime.js":2}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
var flatten = function(xss) {
    return [].concat.apply([], xss);
};

var filter = function(f, xs) {
    var ys = [];
    xs.forEach(function(x) {
        if (f(x)) {ys.push(x);}
    });
    return ys;
};

var unique = function(xs) {
    var uxs = [];
    xs.forEach(function(x) {
        if (uxs.indexOf(x) === -1) {uxs.push(x);}
    });
    return uxs;
};

module.exports = {
    "flatten" : flatten,
    "filter"  : filter,
    "unique"  : unique
};

},{}],4:[function(require,module,exports){
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

},{"./functional.js":3}],5:[function(require,module,exports){
var main = function(initialTodos) {
	  "use strict";
    var fjs      = require("./functional.js");
    var io       = require("./io.js");
    var model    = require("./model.js");
    var datetime = require("./datetime.js");

    initialTodos.forEach(function(todo) {
        $.post("todos", todo, function(response) {
            console.log("we posted an initial todo!");
            //console.log(response);
            console.log("number of records: " + response.length);
            console.log("for example the first one is");
            console.log(model.displayTodo(response[0]));
        });
    });
    var todos = [];
    //var todos = data.todos;
    $.get("todos.json", function(todoObjects) {
        console.log("initialized with " + todoObjects.length + " objects");
        console.log("obtained todos, " + todoObjects.length + " in number");
        todos = todoObjects;
    }).fail(function(jqXHR, textStatus, error) {
        console.log("ERROR: ");
        console.log(error);
        return [];
    });


    var todosDescriptions   = model.descriptions(todos);
    var todosTags           = model.tags(todos);
    var todosByTag          = model.organizedByTags(todos);

    var addTodoFromInputBox = function() {
        var $new_todo;
        var $input_todo = $(".todo-input input");
        if ($input_todo.val() !== "") {
		        $new_todo = $("<li>").text($input_todo.val());
            $new_todo.hide();
		        $("div.todosDescriptionsol").prepend($new_todo);
            $new_todo.fadeIn();
            todosDescriptions.push($input_todo.val());
        }

        $input_todo.val("");
    };

	  $(".todo-input button").on("click", function (event) {
		    console.log("Hello World! Whats TODO today?")

        addTodoFromInputBox();
	  });

	  $(".todo-input input").on("keypress", function (event) {
        var $new_todo;
            addTodoFromInputBox();
	  });


    var tabs = [
        {
            "name" : "Newest",
            "content" : function() {
                var $content =  $("<ol>");
                todos.reverse().forEach(function (todo) {
                    $content.append($("<li>").text(model.displayTodo(todo)))
                });
                todos.reverse();
                return $content;
            }
        },
        {
            "name" : "Oldest",
            "content" : function() {
                var $content = $("<ol>");
                todos.forEach(function (todo) {
                    $content.append($("<li>").text(model.displayTodo(todo)))
                });
                return $content;
            }
        },
        {
            "name" : "Tags",
            "content" : function() {
                var $content = $("<div>").addClass("tagged");
                todosByTag = model.organizedByTags(todos);
                todosByTag.forEach(function (tagged) {
                    var $taggedName = $("<h3>").text(tagged.name),
                        $taggedContent = $("<ol>");
                    tagged.todos.forEach(function(desc) {
                        var $li = $("<li>").text(model.displayDescription(desc));
                        $taggedContent.append($li);
                    });
                    $content.append($taggedName);
                    $content.append($taggedContent);
                });

                return $content;
            }
        },
        {
            "name" : "Add",
            "content" : function() {
                var $descInput  = $("<input>").addClass("description"),
                    $descLabel  = $("<p>").text("Description"),
                    $tagInput   = $("<input>").addClass("tags"),
                    $tagLabel   = $("<p>").text("Tags"),
                    $tagHelp    = $("<p>").text("(comma separated words)"),
                    $button     = $("<button>").text("Done");

                $button.on("click", function () {
                    var d = io.readDescription($descInput.val());
                    console.log("TODO added " + d);
                    
                    if (d.valid) {
                        var ts = io.readTags($tagInput.val());
																				
												if (ts.length != 0) {
														console.log("todo tags entered, " + ts.length);
                            var newTodo = {
																"description" : d.text,
																"tags" : ts,
                                "timed" : datetime.show(datetime.now())
														};
                            //a quick post to our todos route
                            $.post("todos", newTodo, function (response) {
                                //this callback is called when the server responds
                                console.log("We posted and the server responded!");
                                console.log(response);
                            });

														todos.push(newTodo);

                            $tagInput.val("");
                            $descInput.val("");
														window.alert("New TODO: \n" + d.text + "(" + ts.join() + ")");
												} else {
                            $tagInput.val();
														window.alert("Please enter some tags for the new TODO!");
												}
                    } else {
												$("main .content input.desc").val("");
                        window.alert("Please enter a description the new TODO!");
                    }
                });

                return  $("<div>")
                    .append($descLabel)
                    .append($descInput)
                    .append($tagLabel)
                    .append($tagHelp)
                    .append($tagInput)
                    .append($button);
            }
        }
    ];

    tabs.forEach(function (tab) {
        var $aElem = $("<a>").attr("href", ""),
            $spanElem = $("<span>").text(tab.name);

        $aElem.append($spanElem);

        $spanElem.on("click", function() {

            $(".tabs a span").removeClass("active");
            $spanElem.addClass("active");
            $("main .content").empty();

            $("main .content").append(tab.content());
            return false;
        });

        $("main .tabs").append($aElem);
    });

    $(".tabs.span Newest").trigger("click");
    //$(".tabs a:first-child span").trigger("click");
};



/*
$(document).ready(function() {
    $.getJSON("data/todos.json", function(todos) {
        // call main with the to-dos as an argument
        main(todos);
    });
});
*/
$(document).ready(function() {
    var data     = require("./data.js");
    //post some jsons into the db
    var initialTodos = data.todos;
    main(initialTodos);
});

},{"./data.js":1,"./datetime.js":2,"./functional.js":3,"./io.js":4,"./model.js":6}],6:[function(require,module,exports){
/*
 The data model and manipulations for TODOs 
 */

var fjs = require("./functional.js");

/*
  todoObjects : {"description": String, "tags": [String], "timed": String}
  */
var descriptions = function(todoObjects) {
    return todoObjects.map(function(todo){
        return todo.description;
    });
};

var tags = function(todoObjects) {
    return fjs.unique(fjs.flatten(todoObjects.map(function(todo) {
        return todo.tags;
    })));
};

var organizedByTags = function(todoObjects) {
    allTags = tags(todoObjects);
    byTag = [];
    allTags.forEach(function(tag) {
        var taggedDescriptions = [];
        todoObjects.forEach(function(todo) {
            if (todo.tags.indexOf(tag) != -1) {
                taggedDescriptions.push({
                    "description" : todo.description,
                    "timed"   : todo.timed
                });
            }
        });
        byTag.push({
            "name" : tag,
            "todos" : taggedDescriptions
        });
    });
    return byTag;
};

var displayTodo = function(todo) {
    return todo.description + "; created at <" + todo.timed + ">";
};
var displayDescription = function(todo) {
    if (todo.tags.length === 0) return "";

    var tags = "(" + todo.tags[0];
    todo.tags.slice(1).forEach(function(tag) {
        tags = tags + ", " + tag;
    });
    tags = tags + ")";
    return todo.description + tags + "; created at <" + todo.timed + ">";
};

module.exports = {
    "descriptions"    : descriptions,
    "tags"            : tags,
    "organizedByTags" : organizedByTags,
    "displayTodo"         : displayTodo,
    "displayDescription" : displayDescription
};

},{"./functional.js":3}]},{},[5]);
