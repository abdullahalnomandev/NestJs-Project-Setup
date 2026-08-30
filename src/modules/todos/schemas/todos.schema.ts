import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

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
export class Todo {
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  })
  title: string;

  @Prop({
    trim: true,
    maxlength: 500,
  })
  description?: string;

  @Prop({
    default: false,
  })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// Prop is used to define the schema of the document
