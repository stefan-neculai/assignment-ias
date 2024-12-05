import { Schema, model, models } from 'mongoose';

export interface ICard {
    _id: string;
    title: string;
    description: string;
}

export interface ICardList {
    _id: string;
    boardId: string;
    cards: ICard[];
    name: string;
}

const cardSchema = new Schema<ICard>({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const cardListSchema = new Schema<ICardList>({
    boardId: { type: String, required: true },
    cards: [cardSchema],
    name: { type: String, required: true }
});

const CardList = models.CardList || model<ICardList>('CardList', cardListSchema, 'CardLists');

export default CardList;