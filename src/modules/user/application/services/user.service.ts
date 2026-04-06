import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getMe(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
