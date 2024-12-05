import { model, models, Schema, Types } from "mongoose";

export interface Todo {
	_id: string;
	text: string;
	completed: boolean;
}

const ToDoSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	text: { type: String, required: true },
	completed: { type: Boolean, required: true },
});

const ToDo = models.ToDo || model<Todo>("ToDo", ToDoSchema, "Todos"); // Explicitly set collection name "Todos"
export default ToDo;
