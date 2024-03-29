import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskList } from "./components/TaskList";
import { TaskAction } from "./action/TaskAction";
import { Task } from "@prisma/client";
import { UpdateTaskForm } from "./components/UpdateTaskForm";

export default async function Page() {
  const tasks: Task[] = await TaskAction.getAll();

  return (
    <section className={"flex flex-col mt-8 gap-4 px-4 items-center"}>
      <h1 className={"text-4xl self-center"}>Task Manager</h1>
      <CreateTaskForm />
      <UpdateTaskForm defaultTasks={tasks}>
        <TaskList tasks={tasks} />
      </UpdateTaskForm>
    </section>
  );
}
