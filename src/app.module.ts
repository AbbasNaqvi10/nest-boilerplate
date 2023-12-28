import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { MONGO_URI } from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AuthModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
