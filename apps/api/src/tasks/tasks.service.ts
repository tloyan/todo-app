import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task
  }

  create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      status: 'OPEN'
    });
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({
      id,
      ...updateTaskDto
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.tasksRepository.save(task);
  }

  async delete(id: number) {
    const task = await this.findOne(id)
    return this.tasksRepository.remove(task);
  }
}
