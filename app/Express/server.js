var express  = require("express"),
    http     = require("http"),
    mongoose = require("mongoose"),
    app      = express(),
    todos    = [];
      

app.use(express.static(__dirname + "/client"));

// tell Express to parse incoming JSON
app.use(express.urlencoded());

//connect to the data store in mongo
mongoose.connect('mongodb://localhost/todos');

//mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description : String,
    tags        : [String],
    timed       : String
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);

// set up our routes
app.get("/hello", function (req, res) {
    res.send("Hello World!");
});

app.get("/goodbye", function (req, res) {
    res.send("Goodbye World!");
});

app.get("/todos.json", function (req, res){
    ToDo.find({}, function(err, todos) {
        if (err !== null)  {
            console.log("Error finding todos");
        }
        console.log("get request found " );
        console.log(todos);
        res.json(todos);
    });
});

// set up the root route
app.get("/", function (req, res) {
    res.send("This is the root route!");
});

app.post("/todos", function (req, res) {
    console.log("server requested to post");
    console.log(req.body);
    var newTodo = new ToDo({
        "description" : req.body.description,
        "tags"        : req.body.tags,
        "timed"       : req.body.timed
    });

    newTodo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
	          // our client expects *all* of the todo items to be returned, so we'll do
	          // an additional request to maintain compatibility
	          ToDo.find({}, function (err, result) {
		            if (err !== null) {
		                // the element did not get saved!
		                res.send("ERROR");
		            }
		            res.json(result);
	          });
	      }
    });
});
