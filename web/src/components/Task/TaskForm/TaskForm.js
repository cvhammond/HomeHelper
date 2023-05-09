import { Form, Input, Button, Switch, Radio, InputNumber, TimePicker, DatePicker} from 'antd'
import { useQuery } from '@redwoodjs/web'

const QUERY = gql`
  query {
    users {
      id
      username
    }
  }
`

const TaskForm = (props) => {
  const { data } = useQuery(QUERY)

  const onSubmit = (data) => {
    props.onSave(data, props?.task?.id)
  }

  return (
    <Form onFinish={onSubmit}>

      <Form.Item label="Title" name="title">
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="User" name="userId">
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
        >
          {data?.users.map((user) => (
            <Radio.Button value={user.id} key={user.id}>
              {user.username}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Time" name="time">
        <TimePicker />
      </Form.Item>

      <Form.Item label="Start date" name="start">
        <DatePicker />
      </Form.Item>

      <Form.Item label="End date" name="end">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Completed" name="completed" initialValue={false} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Recurring" name="recurring" initialValue={false} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Recurring days" name="recurringDays">
        <InputNumber />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TaskForm
