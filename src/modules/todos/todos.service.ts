import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todos.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import QueryBuilder from 'src/builder/QueryBuilder';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async getAllTodos(query: Record<string, unknown>) {
    const packageQuery = new QueryBuilder(this.todoModel.find(), query)
      .filter()
      .sort()
      .paginate()
      .fields()
      .search(['title', 'description']);
    
    const result = await packageQuery.modelQuery;
    const pagination = await packageQuery.getPaginationInfo();
    return {
      data: result,
      meta: pagination ,
    };
  }
  // async getAllTodos(query: TodoQueryDto) {
  //   const { page, limit } = query;
  //   const [todos, total] = await Promise.all([
  //     this.todoModel
  //       .find()
  //       .skip((page - 1) * limit)
  //       .limit(limit)
  //       .exec(),
  //     this.todoModel.countDocuments(),
  //   ]);

  //   const totalPage = Math.ceil(total / limit);
  //   return {
  //     meta: {
  //       page,
  //       limit,
  //       total,
  //       totalPage,
  //     },
  //     data: todos,
  //   };
  // }

  createTodo(createTodoDto: CreateTodoDto) {
    const todos = new this.todoModel(createTodoDto);
    return todos.save();
  }

  async getOneTodo(id: string) {
    // Check if the todo exists
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  // DELETE
  async deleteTodo(id: string) {
    // Check if the todo exists
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    // Delete the todo
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    return { message: 'Todo deleted successfully', deletedTodo };
  }

  // UPDATE
  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    // Check if the todo exists
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    // Update the todo
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, {
        new: true,
      })
      .exec();
    return updatedTodo;
  }
}
