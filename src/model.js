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

var display = function(todo) {
    return todo.description + "; created at <" + todo.timed + ">";
};

module.exports = {
    "descriptions"    : descriptions,
    "tags"            : tags,
    "organizedByTags" : organizedByTags,
    "display"         : display
};
