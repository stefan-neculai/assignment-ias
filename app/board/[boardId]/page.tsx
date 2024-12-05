import React, { useState } from 'react';
import { getCardLists } from './actions';
import { ICardList } from '@/model/cardlist';
import { useParams } from 'next/navigation';
import { IBoard } from '@/model/board';
import { getBoard } from '../../actions';
import Board from '@/app/components/Board';

interface BoardPageProps {
    params: Promise<{ boardId: string }>;
}
const BoardPage: React.FC<BoardPageProps> = async ({params}) => {
    const boardId = (await params).boardId as string;
    const cardLists: ICardList[] = await getCardLists(boardId);
    const board: IBoard = await getBoard(boardId) as IBoard;

    return (
        <div className="h-full overflow-auto p-10">
            <Board initialCardLists={cardLists} board={board}/>
        </div>
    );
};

export default BoardPage;