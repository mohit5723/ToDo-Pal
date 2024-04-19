

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [todoList, setTodoList] = useState([]);
	const [todoInput, setTodoInput] = useState('');
	axios.defaults.withCredentials = true;

	const fetchData = async () => {
		try {
			const response = await axios.get('https://to-do-pal-api.vercel.app/display-todo');
			// console.log(response.data)
			setTodoList(response.data);
		} catch (error) {
			console.error('Error fetching todo list:', error);
		}
	};

	const addTodo = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://to-do-pal-api.vercel.app/add-todo', {
				todo: todoInput,
			});
			setTodoInput('');
			console.log(response.data);
		} catch (error) {
			console.error('Error fetching todo list:', error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const response = await axios.delete(
				`https://to-do-pal-api.vercel.app/${id}`
			);

			fetchData();
		} catch (error) {}
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<>
			<div
				style={{
					display:"flex",
					
				}}
			>
				<div style={{ width: '300px', textAlign: 'center' }}>
					<h1>Todo List</h1>
					<form onSubmit={addTodo}>
						<input
							type="text"
							value={todoInput}
							onChange={(e) => setTodoInput(e.target.value)}
							placeholder="Enter todo"
							style={{
								marginBottom: '10px',
								width: '100%',
								padding: '8px',
								fontSize: '16px',
							}}
							required
						/>
						<button
							type="submit"
							style={{
								padding: '8px 16px',
								fontSize: '16px',
								borderRadius: '4px',
								background: '#007bff',
								color: '#fff',
								border: 'none',
								cursor: 'pointer',
							}}
						>
							Add Todo
						</button>
					</form>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						{todoList.map((todo) => (
							<li
								key={todo._id}
								style={{
									marginBottom: '8px',
									padding: '8px',
									background: '#5ab3f0ff',
									borderRadius: '4px',
									border: '1px solid #ddd',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<span>{todo.todo}</span>
								<button
									onClick={() => deleteTodo(todo._id)}
									style={{
										background: '#dc3545',
										color: '#fff',
										border: 'none',
										borderRadius: '4px',
										padding: '6px 12px',
										cursor: 'pointer',
									}}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default App;
