"use server";

import connectMongo from "@/db/mongoose";
import ToDo, { Todo } from "@/model/todo";
import { Types } from "mongoose";
import Board, { IBoard as BoardType, IBoard } from "@/model/board";

export async function getBoard(boardId : string) {
	try {
		await connectMongo();
		const board = await Board.findById(boardId).lean<IBoard>();
		console.log("Board:", board, " id ", boardId);
		return board;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getItems(): Promise<Todo[]> {
	try {
		await connectMongo();
		const todos = await ToDo.find({}).lean<Todo[]>();
		const formattedTodos = todos.map((todo) => ({
			_id: todo._id.toString(),
			text: todo.text,
			completed: todo.completed,
		}));
		return formattedTodos;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function createItem(text: Todo["text"]) {
	try {
		await connectMongo();
		const newTodo = new ToDo({
			_id: new Types.ObjectId(), // Manually provide an _id
			text,
			completed: false, // Default to false when creating a new task
		});
		await newTodo.save();
		console.log("Created new Todo:", newTodo);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteItem(id: Todo["_id"]) {
	console.log(id);
	// TODO: delete an item
	await connectMongo();
	await ToDo.findByIdAndDelete(id);
	console.log("Deleted Todo with id:", id);
}

export async function markIncomplete(id: Todo["_id"]) {
	console.log(id);
	// TODO: mark a task as incomplete
	await connectMongo();
	await ToDo.findByIdAndUpdate(id, { completed: false });
	console.log("Marked Todo as incomplete with id:", id);
}

export async function markDone(id: Todo["_id"]) {
	console.log(id);
	// TODO: mark a task as done
	await connectMongo();
	await ToDo.findByIdAndUpdate(id, { completed: true });
	console.log("Marked Todo as done with id:", id);
}

export const updateItem = async (id: Todo["_id"], text: Todo["text"]) => {
	console.log(id);
	console.log(text);
	// TODO: update an item
	await connectMongo();
	await ToDo.findByIdAndUpdate(id, { text });
	console.log("Updated Todo with id:", id);
};

export async function getBoards(): Promise<BoardType[]> {
	try {
		await connectMongo();
		const boards = await Board.find({}).lean<BoardType[]>();
		const formattedBoards = boards.map((board) => ({
			_id: board._id.toString(),
			name: board.name,
		}));
		console.log("Formatted Boards:", formattedBoards);
		return formattedBoards;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function createBoard(name: BoardType["name"]) {
	try {
		await connectMongo();
		const newBoard = new Board({
			_id: new Types.ObjectId(), // Manually provide an _id
			name,
		});
		await newBoard.save();
		console.log("Created new Board:", newBoard);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteBoard(id: BoardType["_id"]) {
	console.log(id);
	try {
		await connectMongo();
		await Board.findByIdAndDelete(id);
		console.log("Deleted Board with id:", id);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function updateBoard(id: BoardType["_id"], name: BoardType["name"]) {
	console.log(id);
	console.log(name);
	try {
		await connectMongo();
		await Board.findByIdAndUpdate(id, { name });
		console.log("Updated Board with id:", id);
	} catch (e) {
		console.error(e);
		throw e;
	}
}