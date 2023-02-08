import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({ type: 'application/json' }))
app.use(cors({ origin: 'http://localhost:5173' , credentials :  true}));

var todos = [];

app.get('/', function (req, res) {
	res.send('Hello World');
});

app.get('/todo', function (req, res) {
	res.json(todos);
	// res.send('Hello World');
});

app.post('/todo', function (req, res) {
	// console.log(req.body)
    todos.push({id : req.body.id, value : req.body.value , checked : req.body.checked})
    // console.log("sss")
	res.send('Hello World');
});
app.put('/todo', function (req, res) {
	var index = todos.findIndex(todo => todo.id === req.body.id)
	todos[index].checked = req.body.checked;
	res.send('Hello World');
});

app.post('/delete-todo', function (req, res) {
	var index = todos.findIndex(todo => todo.id === req.body.id)
	todos.splice(index , 1)
	// todos[index].checked = req.body.checked;
	res.send('Hello World');
});

app.listen(3001);
