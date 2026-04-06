import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.registerUseCase.execute(dto);
    return { id: user.id, email: user.email.toString() };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}
