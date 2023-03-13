import { Schema } from 'mongoose';
import { findOneOrCreate } from './todo.statics';

const todoSchema = new Schema({
  title: String,
  task: String
  
});

todoSchema.statics.findOneOrCreate = findOneOrCreate;
export default todoSchema;