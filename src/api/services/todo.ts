import { TodoModel } from "../model/todos/todo.model";
import { ITodo, ITodoDocument } from '../model/todos/todo.types';

class TodoService {
    async createTodo(todo: ITodo): Promise<void> {
        try {
          await TodoModel.create(todo)
        } catch (error) {
          throw error  
        }
    }

    async getTodo(todoId: string): Promise<ITodoDocument> {
        try {
           const todo = await TodoModel.findById(todoId) 
           if (!todo) {
            throw new Error('no todo found')
           }
           return todo
        } catch (error) {
            throw error
            
        }
    }

    async getTodos(): Promise<ITodoDocument[]> {
        try {
          const todos = await TodoModel.find()
          if(!todos) {
            throw new Error('no records found')
          }
          return todos
        } catch (error) {
            throw error
        }
    }

    async updateTodo(todoId: string): Promise<void> {
        try {
            const todo = await TodoModel.findById(todoId);
            if (!todo) {
                throw new Error ('no record found')
            }
            await TodoModel.updateMany({_id: todoId}, todo)
        } catch (error) {
            throw error
        }
    }

    async  deleteTodo(todoId: string): Promise<void> {
        try {
            await TodoModel.deleteOne({_id: todoId});
        } catch (error) {
          throw error
        }
    }
}

export default new TodoService()