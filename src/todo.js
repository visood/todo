var main = function(todos) {
	  "use strict";

    //some TODOs to start with

    var todosDescriptions = todos.map(function(todo) {
        return todo.description;
    });

    var flatten = function (xss) {
        return [].concat.apply([], xss);
    };

		var filter = function(f, xs) {
				var ys = [];
				xs.forEach(function(x) {
						if (f(x)) {
								ys.push(x);
						}
				});
				return ys;
		} 

    // get unique elements -- this can be put in a library

    var uniqueElements = function(xs) {
        var uxs = [];
        xs.forEach(function (x) {
            if (uxs.indexOf(x) === -1) {
                console.log("add to unique elements");
                console.log(x);
                uxs.push(x);
            }
        });
        return uxs;
    };

    var todosTags = uniqueElements(flatten(todos.map(function(todo) {
        return todo.tags;
    })));

    var organizeByTags = function(todoObjects) {
        var tags = uniqueElements(flatten(todoObjects.map(function(todo) {
            return todo.tags;
        })));
        var byTag = [];

        tags.forEach(function (tag) {
            var ds = [];
            todoObjects.forEach(function(todo){
                if (todo.tags.indexOf(tag) !== -1) {
                    ds.push(todo.description);
                }
            });
            byTag.push({"tag" : tag, "todos" : ds});
        });
        return byTag;
    };

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
        var $element = $(element),
            $todoContent;
        $element.on("click", function() {
            $(".tabs span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                console.log("FIRST TAB CLICKED!");
                $todoContent = $("<ol>");
                todosDescriptions.reverse().forEach(function (todo) {
                    $todoContent.append($("<li>").text(todo));
                });
                todosDescriptions.reverse();
								$("main .content").append($todoContent);
            } else if ($element.parent().is(":nth-child(2)")) {
                console.log("SECOND TAB CLICKED!");
                $todoContent = $("<ol>");
                todosDescriptions.forEach(function (todo) {
                    $todoContent.append($("<li>").text(todo));
                });
                $("main .content").append($todoContent);
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("TAGs TAB CLICKED");
                var $tagContent = $("<ul>");
                todosTags.forEach(function (tag) {
                    $tagContent.append($("<li>").text(tag));
                });
								/*
                organizeByTags(todos).forEach(function (todo) {
                    $tagContent.append($("<li>").text(todo.tag));
                    $tagContent.append($("<li>").text("----------------"));
                    todo.todos.forEach(function (todo) {
                        $tagContent.append($("<li>").text(todo));
                    });
                    $tagContent.append($("<li>").text("----------------"));
                });
								*/
                $("main .content").append($tagContent);
            } else if ($element.parent().is(":nth-child(4)")) {
                console.log("ADD TAB CLICKED!");
                var $mcont = $("main .content");

                var $descInput = $("<input class=\"desc\" type=\"text\">")
                $mcont.append($("<h2>").text("Description"));
                $mcont.append($descInput);

                $mcont.append($("<h2>").text("Tags"));
                $mcont.append($("<h3>").text("(comma separated)"));
                var $tagInput = $("<input class=\"tags\" type=\"text\">")
                $mcont.append($tagInput);

								$mcont.append($("<br>"));
                var $but = $("<button>").text("Done");
                $mcont.append($but);
								$mcont.append($("<br>"));
								$mcont.append($("<br>"));
								$mcont.append($("<hr>"));

                $("main .content button").on("click", function (event) {
                    var d = $("main .content input.desc").val();
                    console.log("TODO added " + d);
                    if (d != "") {
												var ts = filter(
														function(x) {return x != "";},
														$("main .content input.tags")
																.val()
																.split(",")
																.map(function(t) { return t.trim();})
												);
																				
												if (ts.length != 0) {
														console.log("todo tags entered, " + ts.length);
														todos.push({
																"description" : todosDescriptions,
																"tags" : ts
														});
														$("main .content input.tags").val("");
														$("main .content input.desc").val("");
														window.alert("New TODO: \n" + d + "(" + ts.join() + ")");
												} else {
														window.alert("Please enter some tags for the new TODO!");
												}
                    } else {
                        window.alert("Please enter a description the new TODO!");
                    }
                });
            }
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};



$(document).ready(function() {
    $.getJSON("data/todos.json", function(todos) {
        // call main with the to-dos as an argument
        main(todos);
    });
});
