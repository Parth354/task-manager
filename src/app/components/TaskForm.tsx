"use client";

import { useState, useTransition } from "react";
import { createTask } from "@/app/actions/taskActions";

export const dynamic = 'force-dynamic'

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      await createTask(title, description, dueDate);
      setTitle(""); 
      setDescription("");
      setDueDate("");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border p-2 w-full rounded-lg"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="border p-2 w-full rounded-lg"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 w-full rounded-lg"
        required
      />
      <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
        {isPending ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
