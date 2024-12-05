import { Schema, model, models } from 'mongoose';

export interface IBoard {
    _id: string;
    name: string;
}

const boardSchema = new Schema<IBoard>({
    name: { type: String, required: true }
});

const Board = models.Board || model<IBoard>('Board', boardSchema, 'Boards');

export default Board;