import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserActiveInterface } from 'src/common/interface/active.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: UserActiveInterface) {
    // Verifica si el usuario asignado existe
    const userExists = await this.userService.findOneByEmail(
      createTaskDto.assigneeEmail,
    );

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // Crea la nueva tarea asociada con el usuario
    const task = this.taskRepository.create({
      ...createTaskDto,
      userEmail: user.email,
      userId: user.id,
    });

    // Guarda la tarea en la base de datos
    return await this.taskRepository.save(task);
  }

  async findAll(user: UserActiveInterface) {
    // Busca todas las tareas asociadas al usuario
    return await this.taskRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    // Busca la tarea por ID y verifica si existe
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    // Verifica si el usuario tiene acceso a la tarea
    if (task.userEmail !== user.email) {
      throw new ForbiddenException('Access denied');
    }

    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: UserActiveInterface,
  ) {
    // Busca la tarea por ID y verifica si existe
    const task = await this.findOne(id, user);

    // Actualiza la tarea con los nuevos datos
    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  async remove(id: number, user: UserActiveInterface) {
    // Busca la tarea antes de eliminarla
    const task = await this.findOne(id, user);

    // Elimina la tarea de la base de datos
    return await this.taskRepository.remove(task);
  }
}
