import { TaskAction } from "../action/TaskAction";
import { revalidatePath } from "next/cache";
import { FC } from "react";

export const CreateTaskForm: FC = () => {
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
