import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(data: DeepPartial<User>): Promise<User> {
    return await this.userRepository.save(data);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async update(id: string, data: DeepPartial<User>): Promise<void> {
    await this.userRepository.update(id, data);
  }

  public async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return user === null;
  }

  public async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
