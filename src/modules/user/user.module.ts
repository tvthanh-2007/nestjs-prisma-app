import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { IUserRepository } from './domain/repositories/user.repository';
import { UserController } from './presentation/user.controller';
import { UserService } from './application/services/user.service';

@Module({
  providers: [
    UserService,
    PrismaUserRepository,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository
    },
  ],
  controllers: [UserController],
  exports: [IUserRepository],
})
export class UserModule { }
