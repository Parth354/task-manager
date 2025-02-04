"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { updateTask } from "@/app/actions/taskActions";

export default function TaskEditModal({
  task,
  onClose,
}: {
  task: any;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateTask(task._id, title, description, dueDate);
      onClose();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Task title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Task description"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 w-full rounded-lg"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
