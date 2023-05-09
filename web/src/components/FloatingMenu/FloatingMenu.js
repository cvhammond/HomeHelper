import { FloatButton } from "antd"
import { PlusOutlined, AppstoreAddOutlined, CalendarOutlined, CarryOutOutlined } from "@ant-design/icons"
import { routes } from '@redwoodjs/router'

const FloatingMenu = () => {
  return (
    <FloatButton.Group style={{ right: 24 }}
      trigger='click'
      type='primary'
      shape='circle'
      icon={<PlusOutlined />}
    >
      <FloatButton
        icon={<AppstoreAddOutlined />}
        tooltip='Add new task'
        href={routes.newTask()}
      />
    </FloatButton.Group>
  )
}

export default FloatingMenu
