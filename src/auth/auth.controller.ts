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
import { SignInUserDto } from './dto/signInUserDto.dto';
import { Public } from '../decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInUserDto) {
    console.log(signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Roles(Role.USER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
