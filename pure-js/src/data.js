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
