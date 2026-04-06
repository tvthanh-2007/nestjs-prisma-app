import { User } from '@/modules/user/domain/entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email.toString(), // unwrap Value Object
      name: user.name ?? '',
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
