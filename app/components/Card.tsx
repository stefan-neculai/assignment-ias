"use client";
import React from 'react';


interface CardProps {
    title: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, onClick }) => {
    return (
        <div className="bg-slate-100 py-2 px-2 rounded" onClick={onClick}>
            <h2 className="text-clip">{title}</h2>
        </div>
    );
};

export default Card;