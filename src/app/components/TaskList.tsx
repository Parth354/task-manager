'use client';
import { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { deleteTask, toggleTaskCompletion } from "@/app/actions/taskActions";
import { getTasks } from "@/app/actions/taskActions";  // Importing the getTasks function

export const dynamic = 'force-dynamic'

export default function TaskList({ tasks: initialTasks }: { tasks: any[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<any | null>(null);

  const refreshTasks = async () => {
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  const handleDelete = async (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
    await deleteTask(taskId);
    refreshTasks();
  };

  const handleCheckboxChange = async (taskId: string, currentCompleted: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, completed: !currentCompleted } : task
      )
    );
    await toggleTaskCompletion(taskId, !currentCompleted);
    refreshTasks();
  };

  return (
    <div key={tasks.length}>
      <ul className="mt-4 space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-3 border rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task._id, task.completed)}
                    className="cursor-pointer"
                  />
                  <span
                    className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {task.title}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-400">{task.dueDate}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingTask(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {editingTask && <TaskEditModal task={editingTask} onClose={() => setEditingTask(null)} />}
    </div>
  );
}
