import { getTasks } from "../app/actions/taskActions";  
import TaskForm from "../app/components/TaskForm";  
import TaskList from "../app/components/TaskList";  

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  const tasks = await getTasks(); 

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}
