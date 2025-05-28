import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async findUserById(id: string) {
    return await this.userRepo.findOneBy({ id });
  }

  async findUsersByIds(participantIds: string[]) {
    return await this.userRepo.find({ where: { id: In(participantIds) } });
  }
}
