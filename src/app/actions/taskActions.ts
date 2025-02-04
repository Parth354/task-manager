"use server"
import Task from '@/models/tasks';
import dbConnect from '@/lib/database';

export async function createTask(title: string, description: string, dueDate?: String) {
  try {
    await dbConnect();
    const newTask = await Task.create({ title, description, dueDate, completed: false });
    return {
      _id: newTask._id.toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      completed: newTask.completed
    };
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Error creating task");
  }
}

export async function getTasks() {
  try {
    await dbConnect();
    const tasks = await Task.find().lean().sort({ createdAt: -1 }); 
    return tasks.map((task: { _id: any; [key: string]: any }) => ({
      ...task,
      _id: task._id.toString()
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error fetching tasks");
  }
}

export async function toggleTaskCompletion(id: string, completed: boolean) {
  try {
    await dbConnect();
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    return {
      _id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      dueDate: updatedTask.dueDate,
      completed: updatedTask.completed
    };
  } catch (error) {
    console.error("Error updating task completion:", error);
    throw new Error("Error updating task completion");
  }
}

export async function deleteTask(id: string) {
  try {
    await dbConnect();
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new Error("Task not found");
    }
    return {
      _id: deletedTask._id.toString(),
      title: deletedTask.title,
      description: deletedTask.description,
      dueDate: deletedTask.dueDate,
      completed: deletedTask.completed
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Error deleting task");
  }
}
export async function updateTask(id: string, title?: string, description?: string, dueDate?: string) {
    try {
      await dbConnect();
      
      const updateData: any = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (dueDate) updateData.dueDate = dueDate;
  
      const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedTask) {
        throw new Error("Task not found");
      }
  
      return {
        _id: updatedTask._id.toString(),
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        completed: updatedTask.completed
      };
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Error updating task");
    }
  }
