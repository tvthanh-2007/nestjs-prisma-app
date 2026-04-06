import { Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository';
import { User } from '@/modules/user/domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export interface RegisterUserDto {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const exists = await this.userRepo.exists(dto.email);
    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = User.create({
      id: randomUUID(),
      email: dto.email,
      passwordHash,
      name: dto.name,
    });

    return this.userRepo.save(user);
  }
}
