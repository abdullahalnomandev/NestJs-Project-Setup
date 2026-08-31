import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { BaseQueryDto } from 'src/common/dto/base-query.dto';
import { QueryParams } from 'src/common/decorators/query-params.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // GET ALL TODOOS
  @Get()
  getTodos(@QueryParams() query: BaseQueryDto) {
    return this.todosService.getAllTodos(query as unknown as Record<string, unknown>);
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
