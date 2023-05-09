import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { message } from 'antd'

import TaskForm from 'src/components/Task/TaskForm'

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

const NewTask = () => {
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: () => {
      message.success('Task created')
      navigate(routes.tasks())
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  const onSave = (input) => {
    createTask({ variables: { input } })
  }

  return (
    <TaskForm onSave={onSave} loading={loading} error={error} />
  )
}

export default NewTask
