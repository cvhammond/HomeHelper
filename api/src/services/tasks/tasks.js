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

export const todaysTasks = async ({ id }) => {
  const nonRecurringTasks = await db.task.findMany({
    where: {
      userId: id,
      recurring: false,
      start: { lte: new Date() },
      completed: { has: false }
    },
  })
  const recurringTasks = await db.task.findMany({
    where: {
      OR: [
        { end: { gte: new Date() }, },
        { end: { equals: null }, },
      ],
      AND:
      {
        userId: id,
        recurring: true,
        start: { lte: new Date() },
      },
    }
  })
  const validRecurringTasks = recurringTasks.filter((task) => {
    const numDaysAfterStart = Math.floor((new Date() - task.start) / (1000 * 60 * 60 * 24))
    const numIntervals = Math.floor(numDaysAfterStart / task.recurringDays)

    return task.completed.length <= numIntervals + 1 && numDaysAfterStart % task.recurringDays === 0
  })
  const tasks = [...nonRecurringTasks, ...validRecurringTasks]

  return tasks
}

export const markTaskCompleted = async ({ id }) => {
  const task = await db.task.findUnique({
    where: { id },
  })
  let completed = [true]
  if (task.recurring) {
    completed = [...task.completed, true]
  }

  return db.task.update({
    data: { completed },
    where: { id },
  })
}

