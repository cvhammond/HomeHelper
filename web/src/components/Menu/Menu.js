import { useState } from 'react'
import { useAuth } from 'src/auth'
import { TabBar } from 'antd-mobile'
import { AddSquareOutline, UserCircleOutline, UnorderedListOutline } from 'antd-mobile-icons'
import { routes, navigate, useLocation } from '@redwoodjs/router'

const Menu = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const { pathname } = useLocation()

  const menuItemToPath = {
    dashboard: routes.home(),
    login: routes.login(),
    profile: routes.profile(),
    add: routes.newTask(),
  }

  const [current, setCurrent] = useState(getKeyFromValue(menuItemToPath, pathname))

  const onChange = (key) => {
    setCurrent(key)
    menuItemToPath[key] && navigate(menuItemToPath[key])
  }

  return (
    <div style={{
      zIndex: '100',
      position: 'fixed',
      width: '100%',
      bottom: 0,
      borderTop: 'solid 1px',
      backgroundColor: '#493657',
      '--adm-color-primary': '#A5DEE5',
      '--adm-color-text-secondary': '#E7DECA'
    }}>
      <TabBar onChange={onChange} activeKey={current}>
        <TabBar.Item key='dashboard' icon={<UnorderedListOutline />} title='Tasks' />
        <TabBar.Item key='add' icon={<AddSquareOutline />} title='Add' />
        {isAuthenticated ?
          <TabBar.Item key='profile' icon={<UserCircleOutline />} title={currentUser?.username} /> :
          <TabBar.Item key='login' icon={<UserCircleOutline />} title='Login' />}
      </TabBar>
    </div>
  )
}

export default Menu

const getKeyFromValue = (obj, value) => {
  return Object.keys(obj).find(key => obj[key] === value)
}
