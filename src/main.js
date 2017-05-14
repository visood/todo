var main = function() {
	  "use strict";
    var data     = require("./data.js");
    var fjs      = require("./functional.js");
    var io       = require("./io.js");
    var model    = require("./model.js");
    var datetime = require("./datetime.js");

    var todos = data.todos;
    //some TODOs to start with

    /*
    var todosDescriptions = todos.map(function(todo) {
        return todo.description;
    });

    var todosTags = fjs.unique(fjs.flatten(todos.map(function(todo) {
        return todo.tags;
    })));
    */

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


    $(".tabs span").toArray().forEach(function (element) {
        //create a click handler for this element
        //note that element is a DOM element, use $ to get a jQuery object
        var $element = $(element);

        $element.on("click", function() {
            var $content;

            $(".tabs span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                console.log("FIRST TAB CLICKED!");
                $content = $("<ol>");
                todos.reverse().forEach(function (todo) {
                    $content.append($("<li>").text(model.display(todo)))
                });
                //model.descriptions(todos.reverse()).forEach(function (todo) {
                    //$content.append($("<li>").text(todo));
                //});
                todos.reverse();
            } else if ($element.parent().is(":nth-child(2)")) {
                console.log("SECOND TAB CLICKED!");
                $content = $("<ol>");
                todos.forEach(function (todo) {
                    $content.append($("<li>").text(model.display(todo)))
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("TAGs TAB CLICKED");
                $content = $("<div>").addClass("tagged");
                todosByTag = model.organizedByTags(todos);
                todosByTag.forEach(function (tagged){
                    var $taggedName    = $("<h3>").text(tagged.name),
                        $taggedContent = $("<ol>");

                    tagged.todos.forEach(function (desc) {
                        var $li = $("<li>").text(model.display(desc));
                        $taggedContent.append($li);
                    });
                    $content.append($taggedName);
                    $content.append($taggedContent);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                console.log("ADD TAB CLICKED!");

                var $descInput  = $("<input>").addClass("description"),
                    $descLabel  = $("<p>").text("Description"),
                    $tagInput   = $("<input>").addClass("tags"),
                    $tagLabel   = $("<p>").text("Tags"),
                    $tagHelp    = $("<p>").text("(comma separated words)"),
                    $button     = $("<button>").text("Done");

                $button.on("click", function () {
                    //var d = io.readDescription($("main .content input.desc").val());
                    var d = io.readDescription($descInput.val());
                    console.log("TODO added " + d);
                    
                    if (d.valid) {
                        var ts = io.readTags($tagInput.val());
																				
												if (ts.length != 0) {
														console.log("todo tags entered, " + ts.length);
														todos.push({
																"description" : d.text,
																"tags" : ts,
                                "timed" : datetime.show(datetime.now())
														});
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

                $content = $("<div>")
                    .append($descLabel)
                    .append($descInput)
                    .append($tagLabel)
                    .append($tagHelp)
                    .append($tagInput)
                    .append($button);
            }

            $("main .content").append($content);
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
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
    main();
});
