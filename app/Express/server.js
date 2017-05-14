var express = require("express"),
    http = require("http"),
    app = express(),
    todos = [];
      

app.use(express.static(__dirname + "/client"));

// tell Express to parse incoming JSON
app.use(express.urlencoded());

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);

// set up our routes
app.get("/hello", function (req, res) {
    res.send("Hello World!");
});

app.get("/goodbye", function (req, res) {
    res.send("Goodbye World!");
});

// set up the root route
app.get("/", function (req, res) {
    res.send("This is the root route!");
});

app.post("/todos", function (req, res) {
    console.log("data has been posted to the server!");
    var newTodo = req.body;

    console.log(newTodo);

    todos.push(newTodo);
  //send-mback a simple object
    res.json({"message" : "You posted to the server!"});
});
