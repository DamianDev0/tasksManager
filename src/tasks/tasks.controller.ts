import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActiveUser } from '../common/decorators/active.user.decorator';
import { UserActiveInterface } from '../common/interface/active.interface';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const newTask = await this.tasksService.create(createTaskDto, user);
    return {
      status: HttpStatus.CREATED,
      message: 'Task created successfully',
      data: newTask,
    };
  }

  @Get()
  async findAll(@ActiveUser() user: UserActiveInterface) {
    const allUserTasks = await this.tasksService.findAll(user);
    return {
      status: HttpStatus.OK,
      message: 'your tasks',
      data: allUserTasks,
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const updateTask = this.tasksService.update(id, updateTaskDto, user);

    return {
      status: HttpStatus.OK,
      message: 'Task updated successfully',
      data: updateTask,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const deleteTask = await this.tasksService.remove(id, user);

    return {
      status: HttpStatus.OK,
      message: 'Task removed successfully',
      data: deleteTask,
    };
  }
}
