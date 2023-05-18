import { Form, Input, Button, Switch, DatePicker, Picker, TextArea, CapsuleTabs } from 'antd-mobile'
import { useQuery } from '@redwoodjs/web'
import dayjs from 'dayjs'

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
    data.completed = data.completed === false ? 0 : 1
    if (data.time[0] === -1 || data.time[1] === -1) {
      data.time = null
    } else {
      data.time = dayjs().set('hour', data.time[0]).set('minute', data.time[1])
    }
    data.userId = parseInt(data.userId)
    console.log(data)
    props.onSave(data, props?.task?.id)
  }

  return (
    <Form onFinish={onSubmit}>

      <Form.Item label="Title" name="title">
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea />
      </Form.Item>

      <Form.Item label="User" name="userId">
        <CapsuleTabs>
          {data?.users.map((user) => {
            return <CapsuleTabs.Tab key={user.id} title={user.username}>{user.username}</CapsuleTabs.Tab>
          })}
        </CapsuleTabs>
      </Form.Item>

      <Form.Item label="Time" name="time"
        initialValue={[-1, -1]}
        trigger='onConfirm'
        onClick={(_, pickerRef) => { pickerRef.current?.open() }}>
        <Picker columns={timeColumns}>
          {value => { return (value[0] && value[1]) ? <span>{dayjs(value).format('HH:mm')}</span> : <span>N/A</span> }}
        </Picker>
      </Form.Item>

      <Form.Item
        label="Start date"
        name="start"
        initialValue={new Date()}
        trigger='onConfirm'
        onClick={(_, datePickerRef) => { datePickerRef.current?.open() }}>
        <DatePicker>
          {value => <span>{dayjs(value).format('YYYY-MM-DD')}</span>}
        </DatePicker>
      </Form.Item>

      <Form.Item
        label="End date"
        name="end"
        trigger='onConfirm'
        onClick={(_, datePickerRef) => { datePickerRef.current?.open() }}>
        <DatePicker>
          {value => value ? <span>{dayjs(value).format('YYYY-MM-DD')}</span> : <span>N/A</span>}
        </DatePicker>
      </Form.Item>

      <Form.Item label="Completed" name="completed" initialValue={false} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Recurring" name="recurring" initialValue={false} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Days To Next Recurrance" name="recurringDays">
        <Input type='number' max={1000} min={1}/>
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

const range = (start, end) => {
  return Array.from({ length: (end - start) }, (_, k) => k + start)
}

const timeColumns = [range(0, 24).map((hour) => { return { label: hour, value: hour } }), range(0, 60).map((minute) => { return { label: minute, value: minute } })]

