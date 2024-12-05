"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ICardList } from '@/model/cardlist';
import { IBoard } from '@/model/board';
import CardList from './CardList';
import { useParams } from 'next/navigation';
import { getCardLists, deleteCardList, updateCardList, createCardList, createCard, deleteCard, updateCard } from '../board/[boardId]/actions';
import posthog from 'posthog-js';

interface BoardProps {
    initialCardLists: ICardList[];
    board: IBoard;
}

const Board: React.FC<BoardProps> = ({initialCardLists, board}) => {
    const [cardLists, setCardLists] = useState<ICardList[]>(initialCardLists);
    const [newBoardName, setNewBoardName] = useState<string>('');
    const boardId = useParams().boardId as string;

    const handleAddCardList = async () => {
        posthog.capture('add_card_list', { boardId });
        
        if (newBoardName.trim()) {
            await createCardList(boardId, newBoardName.trim());
            setCardLists(await getCardLists(boardId));
            setNewBoardName('');
        }
    }

    const handleDeleteCardList = async (id: string) => {
        posthog.capture('delete_card_list', { boardId });
        await deleteCardList(id);
        setCardLists(await getCardLists(boardId));
    }

    const handleEditCardList = async (id: string, name: string) => {
        posthog.capture('edit_card_list', { boardId });
        await updateCardList(id, name);
        setCardLists(await getCardLists(boardId));
    }

    const handleAddCard = async (cardListId: string, cardName: string) => {
        posthog.capture('add_card', { boardId });
        await createCard(cardListId, cardName, 'Description');
        setCardLists(await getCardLists(boardId));
    }

    const handleEditCard = async (cardListId: string, cardId: string, title: string, description: string) => {
        posthog.capture('edit_card', { boardId });
        await updateCard(cardListId, cardId, title, description);
        setCardLists(await getCardLists(boardId));
    }

    const handleDeleteCard = async (cardListId: string, cardId: string) => {
        posthog.capture('delete_card', { boardId });
        await deleteCard(cardListId, cardId);
        setCardLists(await getCardLists(boardId));
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddCardList()
        }
    }

    useEffect(() => {
        posthog.capture('view_board', { boardId });
    }, []);

    return (
        <div className="h-full">
            <h1 className='text-4xl text-white font-semibold mb-4'>{board.name}</h1>
            <div className="flex gap-5">
                {cardLists.map((cardList) => (
                    <CardList key={cardList._id} cardList={cardList}
                    handleDeleteCardList={handleDeleteCardList}
                    handleEditCardList={handleEditCardList}
                    handleAddCard={handleAddCard}
                    handleEditCard={handleEditCard}
                    handleDeleteCard={handleDeleteCard}
                    />
                ))}
                <div className='flex gap-4 items-start'>
                    <input 
                        type="text" 
                        value={newBoardName} 
                        onChange={(e) => setNewBoardName(e.target.value)} 
                        onKeyDown={(e) => handleEnter(e)}
                        placeholder="Add a new list!" 
                        className="border p-2 rounded"
                    />
                    <button 
                        onClick={handleAddCardList}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    >
                        Add
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Board;