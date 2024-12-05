"use client";
import React, { useEffect } from 'react';
import Card from './Card'; // Assuming you have a Card component
import { ICard, ICardList } from '@/model/cardlist';
import CardModal from './CardModal';

interface CardListProps {
    cardList: ICardList;
    handleDeleteCardList: (id: string) => void;
    handleEditCardList: (id: string, name: string) => void;
    handleAddCard: (cardListId: string, cardName: string) => void;
    handleEditCard: (cardListId: string, cardId: string, title: string, description: string) => void;
    handleDeleteCard: (cardListId: string, cardId: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cardList, handleDeleteCardList, handleEditCardList, handleAddCard, handleDeleteCard, handleEditCard }) => {
    const [newName, setNewName] = React.useState<string>(cardList.name);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [cardName, setCardName] = React.useState<string>('');
    const [modalCard, setModalCard] = React.useState<ICard | null>(null);

    const handleEdit = () => {
        setIsEditing(false);
        handleEditCardList(cardList._id, newName);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setNewName(cardList.name);
    }

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    }

    const handleEnterCard = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addCard();
        }
    }

    const addCard = () => {
        handleAddCard(cardList._id, cardName);
        setCardName('');
    }

    const deleteCard = (cardId: string) => {
        handleDeleteCard(cardList._id, cardId);
    }

    const editCard = (cardId: string, title : string, description : string) => {
        handleEditCard(cardList._id, cardId, title, description);
    }

    useEffect(() => {
        // update modalCard if not null
        if (modalCard) {
            const updatedCard = cardList.cards.find(card => card._id === modalCard._id);
            if (updatedCard) {
                setModalCard(updatedCard);
            }
        }
    }, [cardList]);
    return (
        <div className="flex flex-col gap-4 align-start justify-start bg-gray-300 p-2 rounded max-w-1/4 sm:max-w-1/2">
            {!isEditing && <h2 className="font-bold text-xl">{cardList.name}</h2>}
            {isEditing && (
                <div className="flex gap-2">
                    <input type="text" value={newName} className="border flex-grow p-2 rounded" onChange={(e) => setNewName(e.target.value)} onKeyDown={handleEnter}/>
                </div>
            )}
            <div className="flex gap-2">
            <button className="bg-red-500 hover:bg-red-600 rounded-md px-2 py-1 text-white" 
                    onClick={() => handleDeleteCardList(cardList._id)}>Delete</button>
            {!isEditing && <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 text-white"
                    onClick={() => setIsEditing(true)}>Edit</button>}
            {isEditing && <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 text-white"
                    onClick={handleEdit}>Save</button>}
            {isEditing && <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 text-white"
                    onClick={handleCancel}>Cancel</button>}
            </div>
            
            {cardList.cards.map(card => (
                <Card key={card._id} title={card.title} onClick={() => setModalCard(card)}
                    />
            ))}
            
            <div className="flex gap-2">
                <input type="text" placeholder="Add a new card!" className="border flex-grow p-2 rounded" value={cardName} onChange={(e) => setCardName(e.target.value)} onKeyDown={handleEnterCard}/>
                <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 text-white" onClick={addCard}>Add</button>
            </div>
            {modalCard && <CardModal card={modalCard} onClose={() => setModalCard(null)} editCard={editCard} deleteCard={deleteCard} />}
         </div>
    );
};

export default CardList;