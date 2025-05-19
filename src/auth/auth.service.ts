import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async validateUser(dto: CreateUserDto) {
    const instance = plainToInstance(CreateUserDto, dto);

    try {
      await validateOrReject(instance);
    } catch (errors) {
      throw new BadRequestException(
        errors.map((err: any) => Object.values(err.constraints)).flat(),
      );
    }

    const userExists = await this.userRepo.findOneBy({ email: dto.email });
		console.log(userExists)
    return userExists ?? (await this.userRepo.save(dto));
  }
}
