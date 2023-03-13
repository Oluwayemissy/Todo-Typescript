import { ITodoDocument, ITodoModel } from './todo.types'
export async function findOneOrCreate(
    todoId: string
): Promise<ITodoDocument> {
    const record = await this.findOne({ todoId });
    if (record) {
      return record;
    } else {
      return this.create({ todoId });
    }
}