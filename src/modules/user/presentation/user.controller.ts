import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/presentation/guard/jwt-auth.guard';
import { UserService } from '../application/services/user.service';
import { UserMapper } from './mapper/user.mapper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any) {
    const user = await this.userService.getMe(req.user.email);

    return UserMapper.toResponse(user);
  }
}
