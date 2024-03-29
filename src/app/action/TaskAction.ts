import vine from "@vinejs/vine";
import { PrismaClient } from "@prisma/client";

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

  public static async getAll() {
    return await prisma.task.findMany();
  }
}
