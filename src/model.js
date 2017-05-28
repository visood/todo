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
