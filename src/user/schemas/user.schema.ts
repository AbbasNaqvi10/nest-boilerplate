import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop()
  role: string;
  @Prop()
  name: string;
  @Prop()
  userName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
