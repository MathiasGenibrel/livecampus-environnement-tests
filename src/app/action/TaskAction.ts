import vine from "@vinejs/vine";
import { PrismaClient } from "@prisma/client";
import { EmptyDataError } from "../../errors/EmptyData";
import { Task } from "../../types/task";

const prisma = new PrismaClient();

export class TaskAction {
  public static async create(formData: FormData) {
    "use server";

    const schema = vine.string().minLength(1);

    try {
      const taskName = await vine.validate({
        schema,
        data: formData.get("task-name"),
      });

      await prisma.task.create({
        data: {
          name: taskName,
        },
      });

      prisma.$disconnect();
    } catch (error) {
      console.error(error);
    }
  }

  public static async updateAll(formData: FormData, defaultTask: Task[]) {
    "use server";

    const formDataEntries = [...formData.entries()];

    if (formDataEntries.length === 0)
      throw new EmptyDataError("No task id found in form data");

    const taskId = new Map(formDataEntries.filter((key) => Number(key[0])));

    const taskToUpdate = defaultTask.map((task) => {
      task.completed = taskId.has(task.id.toString());

      return task;
    });

    console.log(taskToUpdate);

    await Promise.allSettled(
      taskToUpdate.map((task) => {
        return prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            completed: task.completed,
          },
        });
      }),
    );
  }

  public static getAll() {
    return prisma.task.findMany();
  }
}
