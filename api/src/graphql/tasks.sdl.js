export const schema = gql`
  type Task {
    id: Int!
    title: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: Int!
    time: DateTime
    start: DateTime!
    end: DateTime
    completed: Int!
    recurring: Boolean!
    recurringDays: Int
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
    todaysTasks(userId: Int!): [Task!]! @requireAuth
  }

  input CreateTaskInput {
    title: String!
    description: String
    userId: Int!
    time: DateTime
    start: DateTime!
    end: DateTime
    completed: Int!
    recurring: Boolean!
    recurringDays: Int
  }

  input UpdateTaskInput {
    title: String
    description: String
    userId: Int
    time: DateTime
    start: DateTime
    end: DateTime
    completed: Int
    recurring: Boolean
    recurringDays: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
    markTaskComplete(id: Int!): Task! @requireAuth
  }
`
