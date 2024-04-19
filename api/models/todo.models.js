const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema(
	{
		todo: String,
	},
	{ timestamps: true }
);

const TodoModel = mongoose.model('Todo',todoSchema);

module.exports = TodoModel