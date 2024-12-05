import React from 'react';
import BoardCollection from '../components/BoardCollection';
import { getBoards } from '../actions';

const Boards: React.FC = async () => {
    const initialBoards = await getBoards();
    return (
        <div className="h-full p-10">
            <BoardCollection initialBoards={initialBoards}/>
        </div>
    );
};

export default Boards;