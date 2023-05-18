import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { Button, Card } from 'antd-mobile'

const ProfilePage = () => {
  const { logOut } = useAuth()
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <Card>
        <Button style={{ marginTop: '24px' }} block onClick={logOut} color='danger'>Log Out</Button>
      </Card>
    </>
  )
}

export default ProfilePage
