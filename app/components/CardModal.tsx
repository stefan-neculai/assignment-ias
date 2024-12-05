"use client";
import { ICard } from '@/model/cardlist';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

interface CardModalProps {
    card: ICard;
    deleteCard: (cardId : string) => void;
    editCard: (cardId : string, title: string, description: string) => void;
    onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, deleteCard, editCard, onClose }) => {
    const [editTitle, setEditTitle] = useState(card.title);
    const [editDescription, setEditDescription] = useState(card.description);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        editCard(card._id, editTitle, editDescription);
        setIsEditing(false);
    }

    const handleDelete = () => {
        deleteCard(card._id);
        onClose();
    }

    useEffect(() => {
        posthog.capture('view_card_details', { cardId: card._id });
    }
    , []);
    
    return (
        <div id="modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col gap-4 bg-slate-100 p-6 rounded-lg shadow-lg w-1/3">
                {!isEditing && <h2 className="text-lg font-bold">{card.title}</h2>}
                {isEditing && <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />}
                {!isEditing && <p className="mt-2">{card.description}</p>}
                {isEditing && <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />}

                <div className="mt-6 flex justify-end">
                    {!isEditing && <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                        Edit
                    </button>}
                    {isEditing && <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2">
                        Save
                    </button>}
                    {isEditing && <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2">
                        Cancel
                    </button>}
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                        Delete
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CardModal;