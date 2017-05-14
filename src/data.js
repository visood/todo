datetime = require("./datetime.js");

var todos = [
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
];

module.exports = {
    "todos" : todos
};
