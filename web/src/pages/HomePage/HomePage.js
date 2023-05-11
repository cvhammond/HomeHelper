import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { Button, Table } from 'antd'
import { useQuery, useMutation } from '@redwoodjs/web'
import { StarOutlined, CheckOutlined, ClockCircleOutlined, CarryOutOutlined } from '@ant-design/icons'

const QUERY = gql`
  query GetTodaysTasks($id: Int!){
    todaysTasks(id: $id) {
      id
      title
      description
      completed
    }
  }
`

const TASK_COMPLETED = gql`
  mutation MarkTaskCompleted($id: Int!) {
    markTaskCompleted(id: $id) {
      id
    }
  }
`

const HomePage = () => {
  const { isAuthenticated, logOut, userMetadata } = useAuth()
  const [tasks, setTasks] = React.useState([])

  const [markTaskCompleted] = useMutation(TASK_COMPLETED)

  const { loading, error, data } =
    useQuery(QUERY, { variables: { id: parseInt(userMetadata) }, onCompleted: (data) => setTasks(formatTaskData(data.todaysTasks)) })

  const columns = [
    {
      title: "Tasks",
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: <ClockCircleOutlined />,
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: <CarryOutOutlined />,
      key: 'id',
      render: (_, record) => (
        <>
          {record.markedCompleted ?
            <Button disabled size='large' icon={<StarOutlined />} /> :
            <Button size='large' type='primary' icon={<CheckOutlined />}
              onClick={() => {
                /* markTaskCompleted({ variables: { id: record.key } }) */
                tasks.find(task => task.key === record.key).markedCompleted = true
                setTasks([...tasks])
              }
              }
            />
          }
        </>
      ),
    },
  ];

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Table dataSource={tasks} columns={columns} pagination={false} />

      {isAuthenticated ?
        <Button onClick={logOut}>Logout</Button> :
        <a href={routes.login()}>
          <Button >Login</Button>
        </a>}
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
    }
  })
}
