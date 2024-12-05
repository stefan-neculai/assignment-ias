"use server";
import connectMongo from "@/db/mongoose";
import ToDo, { Todo } from "@/model/todo";
import { Types } from "mongoose";
import Board, { IBoard as BoardType } from "@/model/board";
import CardList, {ICard, ICardList} from "@/model/cardlist";

export async function getCardLists(boardId: string): Promise<ICardList[]> {
    try {
        await connectMongo();
        const cardLists = await CardList.find({ boardId }).lean<ICardList[]>();
        const formattedCardLists = cardLists.map((cardList) => ({
            _id: cardList._id.toString(),
            boardId: cardList.boardId,
            name: cardList.name,
            cards: cardList.cards,
        }));
        console.log("Formatted CardLists:", formattedCardLists);
        return formattedCardLists;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

export async function createCardList(boardId: string, name: ICardList["name"]) {
    try {
        await connectMongo();
        const newCardList = new CardList({
            _id: new Types.ObjectId(), // Manually provide an _id
            boardId,
            name,
            cards: [],
        });
        await newCardList.save();
        console.log("Created new CardList:", newCardList);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

export async function deleteCardList(id: ICardList["_id"]) {
    console.log(id);
    try {
        await connectMongo();
        await CardList.findByIdAndDelete(id);
        console.log("Deleted CardList with id:", id);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

export async function updateCardList(id: ICardList["_id"], name: ICardList["name"]) {
    console.log(id);
    console.log(name);
    try {
        await connectMongo();
        await CardList.findByIdAndUpdate(id, { name });
        console.log("Updated CardList with id:", id);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

export async function createCard(cardListId: ICardList["_id"], title: ICard["title"], description: ICard["description"]) {
    try {
        await connectMongo();
        const newCard = {
            _id: new Types.ObjectId(),
            title,
            description,
        };
        console.log("cardListId ", cardListId);
        await CardList.findByIdAndUpdate(cardListId, { $push: { cards: newCard } });
        console.log("Created new Card:", newCard);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

export async function deleteCard(cardListId: ICardList["_id"], cardId: ICard["_id"]) {
    console.log(cardListId);
    console.log(cardId);
    try {
        await connectMongo();
        await CardList.findByIdAndUpdate(cardListId, { $pull: { cards: { _id: cardId } } });
        console.log("Deleted Card with id:", cardId);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}

export async function updateCard(cardListId: ICardList["_id"], cardId: ICard["_id"], title: ICard["title"], description: ICard["description"]) {
    console.log(cardListId);
    console.log(cardId);
    console.log(title);
    console.log(description);
    try {
        await connectMongo();
        await CardList.updateOne(
            { _id: cardListId, "cards._id": cardId },
            { $set: { "cards.$.title": title, "cards.$.description": description } }
        );
        console.log("Updated Card with id:", cardId);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}