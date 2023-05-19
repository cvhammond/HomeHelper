import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { SwipeAction, List, SpinLoading, AutoCenter, Result, ResultPage, Space, Button } from 'antd-mobile'
import {
  CheckCircleOutline,
  InformationCircleOutline,
  RightOutline,
  LeftOutline,
  TextOutline,
  MinusOutline,
  CalendarOutline,
} from 'antd-mobile-icons'
import { navigate, routes } from '@redwoodjs/router'
import { useQuery, useMutation } from '@redwoodjs/web'
import { useRef } from 'react'
import dayjs from 'dayjs'

const QUERY = gql`
  query GetTodaysTasks($userId: Int!){
    todaysTasks(userId: $userId) {
      id
      title
      description
      completed
      time
    }
  }
`

const TASK_COMPLETED = gql`
  mutation MarkTaskComplete($id: Int!) {
    markTaskComplete(id: $id) {
      id
    }
  }
`

const HomePage = () => {
  const { userMetadata } = useAuth()
  const [tasks, setTasks] = React.useState()

  const [markTaskComplete] = useMutation(TASK_COMPLETED)
  const swipeActionRefs = useRef([])

  useQuery(
    QUERY, {
    variables: { userId: parseInt(userMetadata) },
    onCompleted: (data) =>
      setTasks(formatTaskData(data.todaysTasks))
  })

  console.log(tasks)

  return (
    <>
      <MetaTags title="Tasks" description="Task Page" />
      {tasks?.length > 0 &&
        <List>
          <List.Item title={<AutoCenter>Tasks for Today</AutoCenter>}
            prefix={<><RightOutline /><InformationCircleOutline /></>}
            extra={<><CheckCircleOutline fontSize={'var(--adm-font-size-9)'} /><LeftOutline fontSize={'var(--adm-font-size-9)'} /></>} >
          </List.Item>
          {tasks.map((task, idx) => {
            return (
              <SwipeAction
                ref={(ref) => swipeActionRefs.current[idx] = ref}
                key={task.key}
                rightActions={[{ key: 'complete', text: <CheckCircleOutline />, color: 'success' }]}
                leftActions={[{ key: 'info', text: <InformationCircleOutline />, color: 'weak' }]}
                onActionsReveal={(side) => {
                  if (side === 'right') {
                    //markTaskComplete({ variables: { id: task.key } })
                    const idx = tasks.findIndex((t) => t.key === task.key)
                    tasks[idx].markedCompleted = true
                    tasks.push(tasks.splice(idx, 1)[0])
                    swipeActionRefs.current?.[idx].close()
                    setTasks([...tasks])
                  }
                  else {
                    navigate(routes.task({ id: task.key }))
                  }
                }}
              >
                <List.Item
                  key={task.key}
                  disabled={task.markedCompleted}
                  prefix={task.description ? <TextOutline /> : <MinusOutline />}
                  extra={
                    task.markedCompleted ?
                      <CheckCircleOutline />
                      : task.time ? dayjs(task.time).format('h:mm a') : <CalendarOutline />}
                >
                  {task.title}
                </List.Item>

              </SwipeAction >
            )
          })}
        </List >}
      {
        tasks?.length == 0 && <ResultPage
          status={'success'}
          title={'All Tasks Complete!'}
          description={
            <Space>
              <Button onClick={() => navigate(routes.newTask())}>Add a new task</Button>
            </Space>}
        />
      }
      {!tasks?.length && <AutoCenter><SpinLoading /></AutoCenter>}
    </>
  )
}

export default HomePage

const formatTaskData = (tasks) => {
  return tasks.map((task) => {
    return {
      key: task.id,
      title: task.title,
      description: task.description,
      markedCompleted: false,
      time: task.time,
    }
  })
}
