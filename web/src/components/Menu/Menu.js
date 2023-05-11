import { useState, useEffect } from 'react'
import { useAuth } from 'src/auth'
import { Menu as MenuAntd } from 'antd'
import { HomeOutlined, LoginOutlined, AppstoreAddOutlined, LogoutOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons'
import { routes } from '@redwoodjs/router'

const Menu = () => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  const [menuItems, setMenuItems] = useState(items)
  const [current, setCurrent] = useState('home')

  const items = [
    {
      key: 'home',
      label: <a href={routes.home()}>Home</a>,
      icon: <HomeOutlined />,
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
    <MenuAntd mode="horizontal" items={menuItems} onClick={onClick} selectedKeys={[current]} theme="dark" />
  )
}

export default Menu


