import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: String;
  completed: boolean;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String },
  completed: { type: Boolean, default: false },
});

export default mongoose.models?.Task || mongoose.model<ITask>('Task', TaskSchema);
