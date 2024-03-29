"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import { Task } from "../../types/task";
interface TaskListProps {
  tasks: Task[];
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const [isEdited, setIsEdited] = useState(false);
  const currentTasks = useRef(tasks);

  const handleEdit = (event: ChangeEvent<HTMLInputElement>) => {
    currentTasks.current = currentTasks.current.map((task) =>
      task.id === Number(event.currentTarget.id)
        ? { ...task, completed: event.currentTarget.checked }
        : task,
    );

    const wasEdited =
      JSON.stringify(currentTasks.current) !== JSON.stringify(tasks);

    setIsEdited(wasEdited);
  };

  return (
    <>
      <ul className={"w-full"}>
        {tasks.map((task) => (
          <li key={task.id} className={"flex gap-4"}>
            <input
              onChange={handleEdit}
              id={task.id.toString()}
              type="checkbox"
              name={task.id.toString()}
              defaultChecked={task.completed}
              className={"w-4 h-4"}
            />
            <span>{task.name}</span>
          </li>
        ))}
      </ul>

      <button
        className={`px-4 py-2 rounded ${
          isEdited
            ? "bg-blue-500 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isEdited}
        type={"submit"}
      >
        Update
      </button>
    </>
  );
};
