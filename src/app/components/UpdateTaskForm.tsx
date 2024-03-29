import { FC, ReactNode } from "react";
import { TaskAction } from "../action/TaskAction";
import { revalidatePath } from "next/cache";
import { Task } from "../../types/task";

interface UpdateTaskFormProps {
  children: ReactNode;
  defaultTasks: Task[];
}

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({
  children,
  defaultTasks,
}) => {
  const actionHandler = async (formData: FormData) => {
    "use server";

    try {
      await TaskAction.updateAll(formData, defaultTasks);
      revalidatePath("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      action={actionHandler}
      className={"flex flex-col w-full mx-16 gap-8 lg:max-w-screen-md"}
    >
      {children}
    </form>
  );
};
