import { Link, routes, navigate, back } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { CloseCircleOutline, CheckCircleOutline } from 'antd-mobile-icons'

import { List, Card, AutoCenter, Space, Button, NavBar } from 'antd-mobile'
import dayjs from 'dayjs'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const GET_USERNAME_QUERY = gql`
  query GetUsername($id: Int!) {
    user(id: $id) {
      username
    }
  }
`


const Task = ({ task }) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { data } = useQuery(GET_USERNAME_QUERY, {
    variables: { id: task.userId },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask({ variables: { id } })
    }
  }


  return (
    <>
      <NavBar onBack={() => back()}>Task</NavBar>
      <List>
        <List.Item title={'Name'}>
          {task.title}
        </List.Item>
        {task.time &&
          <List.Item title={'Due'}>
            {dayjs(task.time).format('h:mm a')}
          </List.Item>}
        {task.description &&
          <List.Item title={'Description'}>
            {task.description}
          </List.Item>
        }
        <List.Item title={'User'}>
          {data?.user?.username}
        </List.Item>
        <List.Item title={'Completed'}>
          {!task.completed ? <CloseCircleOutline /> : <CheckCircleOutline />}
        </List.Item>
        <List.Item title={'Recurring'}>
          {!task.recurring ? <CloseCircleOutline /> : <CheckCircleOutline />}
        </List.Item>
        {task.recurring &&
          <List.Item title={'Recurring days'}>
            {task.recurringDays}
          </List.Item>}

      </List>

      <Card>
        <AutoCenter>
          <Space>
            <Button color={'primary'} onClick={() => navigate(routes.editTask({ id: task.id }))}>Edit</Button>
            <Button color={'danger'} onClick={() => onDeleteClick(task.id)}>Delete</Button>
          </Space>
        </AutoCenter>
      </Card>
    </>
  )
}

export default Task
