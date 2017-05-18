var main = function() {
	  "use strict";
    var data     = require("./data.js");
    var fjs      = require("./functional.js");
    var io       = require("./io.js");
    var model    = require("./model.js");
    var datetime = require("./datetime.js");

    var todos = data.todos;
    //var todos = $.get("/todos.json");

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
                    $content.append($("<li>").text(model.display(todo)))
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
                    $content.append($("<li>").text(model.display(todo)))
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
                        var $li = $("<li>").text(model.display(desc));
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
