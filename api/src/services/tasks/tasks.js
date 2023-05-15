import { db } from 'src/lib/db'

export const tasks = () => {
  return db.task.findMany()
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask = ({ input }) => {
  return db.task.create({
    data: input,
  })
}

export const updateTask = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task = {
  user: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).user()
  },
}

export const todaysTasks = async ({ userId }) => {
  const nonRecurringTasks = await db.task.findMany({
    where: {
      OR: [
        { end: { gte: new Date() } },
        { end: null },
      ],
      userId: userId,
      recurring: false,
      start: { lte: new Date() },
      completed: 0,
    },
  })
  const recurringTasks = await db.task.findMany({
    where: {
      OR: [
        { end: { gte: new Date() } },
        { end: null },
      ],
      AND: {
        userId: userId,
        recurring: true,
        start: { lte: new Date() },
      },
    },
  })
  const validRecurringTasks = recurringTasks.filter(task => {
    const numDaysAfterStart = Math.floor((new Date() - task.start) / (1000 * 60 * 60 * 24))
    const numIntervals = Math.floor(numDaysAfterStart / task.recurringDays)

    return numIntervals >= task.completed
  })

  return [...nonRecurringTasks, ...validRecurringTasks]
}

export const markTaskComplete = ({ id }) => {
  return db.task.update({
    data: { completed: { increment: 1 } },
    where: { id },
  })
}
