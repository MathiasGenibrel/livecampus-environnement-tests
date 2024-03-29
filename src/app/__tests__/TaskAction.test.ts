import { TaskAction } from '../action/TaskAction.js';
import { PrismaClient } from '@prisma/client';

// Mocking PrismaClient instance
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  })),
}));

describe('TaskAction', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    // Reset mocks before each test
    prisma = new PrismaClient();
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a task with valid input', async () => {
      // Mock FormData
      const formData = new FormData();
      formData.append('task-name', 'Sample Task');

      // Call the create method
      await TaskAction.create(formData);

      // Assert that Prisma's create method is called with the correct data
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          name: 'Sample Task',
        },
      });
    });

    it('should handle error if input is invalid', async () => {
      // Mock FormData with invalid input
      const formData = new FormData();

      // Call the create method
      await TaskAction.create(formData);

      // Assert that console.error is called
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      // Mock return value for findMany
      (prisma.task.findMany as jest.Mock).mockResolvedValueOnce([
        { id: 1, task: 'Task 1', completed: false },
        { id: 2, task: 'Task 2', completed: true },
      ]);

      // Call the getAll method
      const tasks = await TaskAction.getAll();

      // Assert that Prisma's findMany method is called
      expect(prisma.task.findMany).toHaveBeenCalled();

      // Assert that the correct tasks are returned
      expect(tasks).toEqual([
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' },
      ]);
    });
  });
});
