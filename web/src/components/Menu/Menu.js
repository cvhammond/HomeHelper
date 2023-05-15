import { useState, useEffect } from 'react'
import { useAuth } from 'src/auth'
import { Menu as MenuAntd } from 'antd'
import { DashboardOutlined, LoginOutlined, AppstoreAddOutlined, LogoutOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons'
import { routes } from '@redwoodjs/router'

const Menu = () => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  const [menuItems, setMenuItems] = useState(items)
  const [current, setCurrent] = useState('dashboard')

  const items = [
    {
      key: 'dashboard',
      label: <a href={routes.home()}>Dashboard</a>,
      icon: <DashboardOutlined />,
    },
  ]

  useEffect(() => {
    if (isAuthenticated) {
      setMenuItems([
        ...items,
        {
          key: 'user',
          label: currentUser?.username,
          icon: <UserOutlined />,
          children: [
            {
              key: 'logout',
              label: <a onClick={logOut}>Logout</a>,
              icon: <LogoutOutlined />,
            },
          ],
        },
      ])
    } else {
      setMenuItems([
        ...items,
        {
          key: 'login',
          label: <a href={routes.login()}>Login</a>,
          icon: <LoginOutlined />,
        },
      ])
    }
  }, [isAuthenticated])

  const onClick = ({ key }) => {
    setCurrent(key)
  }

  return (
    <MenuAntd mode="inline" items={menuItems} onClick={onClick} selectedKeys={[current]} />
  )
}

export default Menu


