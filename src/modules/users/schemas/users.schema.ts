import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: Record<string, any>) => {
      const id = ret._id.toString();
      delete ret._id;
      delete ret.__v;

      return {
        id,
        ...ret,
      };
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop({ default: '' })
  profileImage: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'local' })
  provider: string;

  @Prop({ enum: ['active', 'blocked'], default: 'active' })
  status: 'active' | 'blocked';

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({
    type: {
      isResetPassword: {
        type: Boolean,
        default: false,
      },
      oneTimeCode: {
        type: Number,
        default: null,
      },
      expireAt: {
        type: Date,
        default: null,
      },
    },
    select: false,
  })
  authentication: {
    isResetPassword: boolean;
    oneTimeCode: number | null;
    expireAt: Date | null;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// Prop is used to define the schema of the document
