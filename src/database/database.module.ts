import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  //   imports: [
  //     MongooseModule.forRoot(
  //       'mongodb+srv://dechains:dechains,com@tradebotbackend.bjo3x6a.mongodb.net/tradeBotDB',
  //       {
  //         useUnifiedTopology: true,
  //       } as MongooseModuleOptions, // Add type assertion here
  //     ),
  //   ],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dechains:dechains,com@tradebotbackend.bjo3x6a.mongodb.net/',
      {
        dbName: 'tradeBotDB',
      },
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class DatabaseModule {}
