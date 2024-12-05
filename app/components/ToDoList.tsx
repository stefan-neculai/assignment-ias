"use client";
import { useState } from "react";
import { getItems, createItem, updateItem, deleteItem, markDone, markIncomplete } from "@/app/actions";
import TodoItem from "@/app/components/ToDoListItem";

/**
 * We try to infer the type returned by the `getItems` function which is async/a promise.
 */
type ToDoListType = Awaited<ReturnType<typeof getItems>>;

export default function ToDoList({ todosInitial }: { todosInitial: ToDoListType }) {
	const [todos, setTodos] = useState<ToDoListType>(todosInitial);
	const [newTodo, setNewTodo] = useState("");

	const handleToggle = async (id: string) => {
		const item = todos.find((todo) => todo._id === id);
		if (item) {
			if (item.completed) {
				await markIncomplete(id);
			} else {
				await markDone(id);
			}
			setTodos(await getItems());
		}
	};

	const handleDelete = async (id: string) => {
		await deleteItem(id);
		setTodos(await getItems());
	};

	const handleAddTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodo.trim()) {
			await createItem(newTodo.trim());
			setTodos(await getItems());
			setNewTodo("");
		}
	};

	const handleEdit = async (id: string, text: string) => {
		await updateItem(id, text);
		setTodos(await getItems());
	};

	return (
		<div className="grow max-w-4xl p-4">
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>
			<form onSubmit={handleAddTodo} className="flex mb-4 shadow-lg">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Add a new todo"
					className="grow rounded-l-lg p-2 text-black outline-none cursor-pointer"
				/>
				<button type="submit" className="rounded-r-lg bg-blue-600 p-2 text-white">
					Add
				</button>
			</form>
			{todos.map((todo) => (
				<TodoItem
					key={todo._id}
					{...todo}
					onToggle={handleToggle}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			))}
		</div>
	);
}
