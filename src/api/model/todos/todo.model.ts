import { model } from 'mongoose';
import { ITodoDocument } from './todo.types';
import todoSchema from './todo.schema';
export const TodoModel = model<ITodoDocument>('todos', todoSchema);