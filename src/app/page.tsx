import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskAction } from "./action/TaskAction";

export default async function Page() {
  const tasks = await TaskAction.getAll();

  return (
    <section className={"flex flex-col mt-8 gap-4 px-4 items-center"}>
      <h1 className={"text-4xl self-center"}>Task Manager</h1>
      <CreateTaskForm />
      <ul className={"w-full"}>
        {tasks.map((task) => (
          <li key={task.id} className={"flex gap-4"}>
            <input
              type="checkbox"
              defaultChecked={task.completed}
              className={"w-4 h-4"}
            />
            <span>{task.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
