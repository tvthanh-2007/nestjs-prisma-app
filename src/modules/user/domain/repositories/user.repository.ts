import { User } from '@/modules/user/domain/entities/user.entity';

export abstract class IUserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract exists(email: string): Promise<boolean>;
}
