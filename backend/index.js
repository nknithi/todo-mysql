// Import required modules
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

// Enable CORS 
app.use(cors());

// Create a JSON parser 
var jsonParser = bodyParser.json();

// Create a connection specifying database connection details
const conn = mysql.createConnection({
    host: "localhost",
    user: "your-sql-user",
    password: "your-sql-password",
    database: "todo"
});

// Establish a connection to the MySQL server using the connection object
conn.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");
}
);

// Endpoint to get details of all tasks
app.get('/allTasks', function (req, res) {
    conn.query("SELECT * from task;", function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).json('Internal Server Error');
            return;
        }
        console.log(result);
        res.send(result)
    })
})

// Endpoint to delete a task with a specific ID
app.delete('/task/:taskId', function (req, res) {
    const taskId = req.params.taskId;
    conn.query("DELETE FROM task WHERE TaskID=?;", taskId, function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).json('Internal Server Error');
            return;
        }
        console.log("Task deleted!!");
        res.send("Task deleted!!");
    })
})

// Endpoint to add a new task
app.post('/task', jsonParser, function (req, res) {
    const { task_name } = req.body;
    // Log the received task_name
    console.log("Received task_name:", task_name);
    conn.query("INSERT INTO task(Task) VALUES(?);", [task_name], function (err, result) {
        if (err) {
            console.error(err);
            return
        }
        console.log("Added task succcesfully")
    });
    res.send("Added task succcesfully");
});


// Start the server on port 5000
app.listen(5000, () => {
    console.log("Server has started");
});



