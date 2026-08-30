import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { TodoQueryDto } from './dto/todo-query.dto/todo-query.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // GET ALL TODOOS
  @Get()
  getTodos(@Query() query: TodoQueryDto) {
    return this.todosService.getAllTodos(query);
  }

  // CREATE TODO
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  // GET ONE TODO
  @Get(':id')
  getOneTodo(@Param('id', MongoIdPipe) id: string) {
    return this.todosService.getOneTodo(id);
  }

  // DELETE
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }

  // UPDATE
  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo(id, updateTodoDto);
  }
}
