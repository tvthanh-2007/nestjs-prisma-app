import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/prisma/prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? this.toDomain(row) : null;
  }

  async save(user: User): Promise<User> {
    const row = await this.prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email.toString(),
        password: user.passwordHash,
        name: user.name,
        role: user.role,
      },
      update: {
        email: user.email.toString(),
        name: user.name,
      },
    });
    return this.toDomain(row);
  }

  async exists(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({ where: { email } });
    return count > 0;
  }

  private toDomain(row: any): User {
    return User.create({
      id: row.id,
      email: row.email,
      passwordHash: row.password,
      name: row.name,
      role: row.role,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
