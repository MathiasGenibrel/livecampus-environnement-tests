import { FC } from "react";
import { TaskAction } from "../action/TaskAction";
import { Method } from "../../types/method";
import { revalidatePath } from "next/cache";

export const CreateTaskForm: FC = async () => {
  const actionHandler = async (formData: FormData) => {
    "use server";

    try {
      await TaskAction.create(formData);
      revalidatePath("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      action={actionHandler}
      method={Method.POST}
      className={"flex w-full mx-16 gap-8 lg:max-w-screen-md"}
    >
      <input type="text" name="task-name" className={"border w-full px-2"} />
      <button
        className={"bg-blue-400 text-white px-4 py-2 rounded"}
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
