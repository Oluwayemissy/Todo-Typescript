import { Document, Model, StringExpressionOperatorReturningArray } from 'mongoose';
export interface ITodo {
    title: string,
    task: string
};

export interface ITodoModel extends Model<ITodoDocument>{
    findOneOrCreate: (
       {
         title,
         task
       }: {title: string; task: string;}
    ) => Promise<ITodoDocument>;
}
export interface ITodoDocument extends ITodo, Document {}
export interface ITodoModel extends Model<ITodoDocument> {}
