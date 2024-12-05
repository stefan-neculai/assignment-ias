"use client";
import { useState } from "react";

interface TodoItemProps {
	_id: string;
	text: string;
	completed: boolean;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ _id, text, completed, onToggle, onDelete, onEdit }: TodoItemProps) {
	const [editMode, setEditMode] = useState(false);
	const [newText, setNewText] = useState(text);

	const startEdit = () => {
		setNewText(text);
		setEditMode(true);
	};
	const cancelEdit = () => {
		setEditMode(false);
	};
	const submitEdit = () => {
		onEdit(_id, newText);
		setEditMode(false);
	};

	return (
		<div
			//   style={{
			//     display: "flex",
			//     justifyContent: "space-between",
			//     alignItems: "center",
			//     padding: "1rem",
			//     marginBottom: "0.5rem",
			//     backgroundColor: "#f3f4f6",
			//     borderRadius: "0.375rem",
			//     boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
			//   }}
			className="flex items-center p-4 rounded-lg shadow-lg mb-8 bg-slate-100"
		>
			<div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
				<input
					type="checkbox"
					id={`todo-${_id}`}
					checked={completed}
					onChange={() => onToggle(_id)}
					//   style={{
					//     marginRight: "0.75rem",
					//     width: "1.25rem",
					//     height: "1.25rem",
					//     borderRadius: "0.25rem",
					//     borderColor: "#d1d5db",
					//     cursor: "pointer",
					//   }}
					className="h-5 w-5 rounded border-blue-500 cursor-pointer mr-3"
				/>
				{editMode === false ? (
					<div
						contentEditable={editMode}
						// style={{
						//   flexGrow: 1,
						//   fontSize: "0.875rem",
						//   fontWeight: 500,
						//   textDecoration: completed ? "line-through" : "none",
						//   color: completed ? "#9ca3af" : "#1f2937",
						// }}
						className={
							"pl-2 grow text-sm font-semibold" +
							(completed ? " line-through text-slate-500" : " text-slate-900")
						}
					>
						{text}
					</div>
				) : (
					<input
						type="text"
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						// style={{
						//   flexGrow: 1,
						//   fontSize: "0.875rem",
						//   fontWeight: 500,
						//   textDecoration: completed ? "line-through" : "none",
						//   color: completed ? "#9ca3af" : "#1f2937",
						// }}
						className={
							"pl-2 grow text-sm font-semibold outline-none bg-transparent border-dashed border-2 border-blue-700 h-10 rounded" +
							(completed ? " line-through text-slate-500" : " text-slate-900")
						}
					/>
				)}
			</div>
			<div>
				{editMode === false && (
					<button
						onClick={startEdit}
						aria-label={`Edit todo: ${text}`}
						className="p-2 bg-transparent hover:bg-slate-500 rounded cursor-pointer text-slate-500 hover:text-white font-semibold transition-colors duration-500"
					>
						Edit
					</button>
				)}
				{editMode === true && (
					<button
						onClick={cancelEdit}
						aria-label={`Edit todo: revert back from ${newText} to ${text}`}
						className="p-2 bg-transparent hover:bg-slate-500 rounded cursor-pointer text-slate-500 hover:text-white font-semibold transition-colors duration-500"
					>
						Cancel
					</button>
				)}
				{editMode === true && (
					<button
						onClick={submitEdit}
						aria-label={`Submit edit todo: from ${text} to ${newText}`}
						className="p-2 bg-transparent hover:bg-slate-500 rounded cursor-pointer text-slate-500 hover:text-white font-semibold transition-colors duration-500"
					>
						Submit
					</button>
				)}
				<button
					onClick={() => onDelete(_id)}
					aria-label={`Delete todo: ${text}`}
					className="p-2 bg-transparent hover:bg-red-800 rounded cursor-pointer text-red-800 hover:text-white font-semibold transition-colors duration-500"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
