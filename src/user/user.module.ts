import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
