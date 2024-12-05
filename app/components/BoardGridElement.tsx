import { IBoard } from '@/model/board';
import Link from 'next/link';
import React from 'react';

interface BoardGridElementProps {
    board: IBoard;
    handleDeleteBoard: (id: string) => void;
    handleEditBoard: (id: string, name: string) => void;
}

const BoardGridElement: React.FC<BoardGridElementProps> = ({ board, handleDeleteBoard, handleEditBoard }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [newName, setNewName] = React.useState(board.name);

    function handleEdit() {
        setIsEditing(false);
        handleEditBoard(board._id, newName);
    }

    function handleCancel() {
        setIsEditing(false);
        setNewName(board.name);
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleEdit();
        }
    }

    return (
        <div className="w-64 h-36 flex items-center justify-center flex-col gap-2 font-sans font-semibold bg-slate-200 rounded">
            {!isEditing && <Link href={`/board/${board._id}`}><h1 className='font-medium text-2xl'>{board.name}</h1></Link>}
            {isEditing && <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={handleKeyPress} className="bg-slate-300 border p-2 rounded"/>}
            <div className="flex gap-2">
                {!isEditing && <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={() => setIsEditing(true)}> Edit </button>}
                {isEditing && <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2" onClick={handleEdit}> Save </button>}
                {isEditing && <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={handleCancel}> Cancel </button>}
                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 mr-1" onClick={() => handleDeleteBoard(board._id)}> Delete </button>
            </div>

        
        </div>
    );
};

export default BoardGridElement;