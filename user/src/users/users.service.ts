import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepo.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: number) {
    return await this.usersRepo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepo.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepo.delete({ id });
  }
}
