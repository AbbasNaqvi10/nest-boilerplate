import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return this.authService.login(loginUserDto);
  }

  @Roles(Role.USER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
