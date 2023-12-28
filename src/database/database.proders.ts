import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://dechains:dechains,com@tradebotbackend.bjo3x6a.mongodb.net/tradeBotDB',
      ),
  },
];
