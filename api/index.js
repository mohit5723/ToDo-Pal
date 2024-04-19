const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Todo = require('./models/todo.models.js');
const cors = require('cors');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://todo-pal.vercel.app', methods:["POST","GET",["DELETE"], }));
const uri =
	'mongodb+srv://mohitgoswami379:H30y9LOv4RskaO6p@cluster0.dohlaol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri);

app.post('/add-todo', async (req, res) => {
	const { todo } = req.body;
	try {
		const todoDoc = await Todo.create({
			todo,
		});
		res.json(todoDoc);
	} catch (error) {
		res.status(404).json(`error at creating the todo: ${error}`);
	}
});

app.get('/display-todo', async (req, res) => {
	try {
		const todoDoc = await Todo.find();
		res.json(todoDoc);
	} catch (error) {
        res.status(404).json(`error at retreiveing todos : ${error}`)
    }
});

app.delete("/delete-todo/:id",async(req,res)=>{
	const {id} = req.params
	// console.log(id)

	try {
		const deletedTodo = await Todo.findByIdAndDelete(id)
		if(deletedTodo){
			res.json("deleted")
		}
		else{
			res.json("not found")
		}

	} catch (error) {
		
	}

})

app.listen(3000, (req, res) => {
	console.log('listerning to port ' + 3000);
});
