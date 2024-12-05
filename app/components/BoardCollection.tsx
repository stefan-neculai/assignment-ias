"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createBoard, getBoards, deleteBoard, updateBoard } from '../actions';
import { IBoard } from '@/model/board';
import BoardGridElement from './BoardGridElement';
import posthog from 'posthog-js';

interface BoardCollectionProps {
    initialBoards: IBoard[];
}

const BoardCollection: React.FC<BoardCollectionProps> = ({initialBoards}) => {
    const [boardList, setBoardList] = useState<IBoard[]>(initialBoards);
    const [newBoardName, setNewBoardName] = useState<string>('');

    const handleAddBoard = async () => {
        posthog.capture('add_board');
        if (newBoardName.trim()) {
            await createBoard(newBoardName.trim());
            setBoardList(await getBoards());
            setNewBoardName('');
        }
    }

    const handleDeleteBoard = async (id: string) => {
        posthog.capture('delete_board', { boardId: id });
        await deleteBoard(id);
        setBoardList(await getBoards());
    }

    const handleEditBoard = async (id: string, name: string) => {
        posthog.capture('edit_board', { boardId: id });
        await updateBoard(id, name);
        setBoardList(await getBoards());
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddBoard()
        }
    }

    useEffect(() => {
        posthog.capture('view_boards');
    }, []);

    return (
        <div className="flex flex-col gap-5 justify-start items-start">
            <h1 className="text-4xl font-semibold font-sans text-white">Boards</h1>
            <div className="flex gap-5">
                <input 
                    type="text" 
                    value={newBoardName} 
                    onChange={(e) => setNewBoardName(e.target.value)} 
                    onKeyDown={(e) => handleEnter(e)} 
                    placeholder='Give your board a name!' 
                    className='border flex-grow p-2 rounded'
                />
                <button onClick={handleAddBoard} className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"> Add Board </button>
            </div>
            <div className="flex flex-wrap gap-4">
                {boardList.map((board) => (
                    <BoardGridElement key={board._id} board={board} handleDeleteBoard={handleDeleteBoard} handleEditBoard={handleEditBoard} />
                ))}
            </div>
        </div>
    );
}

export default BoardCollection;