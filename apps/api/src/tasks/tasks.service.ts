import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.tasksRepository.find({
      relations: {
        categories: true,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      relations: { categories: true },
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async findAllCategories() {
    return await this.categoryRepository.find({
      order: {
        name: 'asc',
      },
    });
  }

  async create(createTaskDto: CreateTaskDto) {
    const categories =
      createTaskDto.categories &&
      (await Promise.all(
        createTaskDto.categories?.map(async (name) =>
          this.preloadCategories(name),
        ),
      ));

    const task = this.tasksRepository.create({
      ...createTaskDto,
      categories,
      status: 'OPEN',
    });
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const categories =
      updateTaskDto.categories &&
      (await Promise.all(
        updateTaskDto.categories?.map(async (name) =>
          this.preloadCategories(name),
        ),
      ));
    const task = await this.tasksRepository.preload({
      id,
      ...updateTaskDto,
      categories,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.tasksRepository.save(task);
  }

  async delete(id: number) {
    const task = await this.findOne(id);
    return this.tasksRepository.remove(task);
  }

  private async preloadCategories(name: string) {
    const existingCategory = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return existingCategory;
    }

    return this.categoryRepository.create({ name });
  }
}
