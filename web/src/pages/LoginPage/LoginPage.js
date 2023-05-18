import { useRef } from 'react'
import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Form, Input, Button, Card, Space, AutoCenter } from 'antd-mobile'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn, currentUser } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast.show(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <Form onFinish={onSubmit}>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button block color="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form >
      <Card>
        <AutoCenter>
          <Space>
            <Button onClick={() => navigate(routes.signup())}>Sign Up</Button>
            <Button onClick={() => navigate(routes.forgotPassword())}>Forgot password?</Button>
          </Space>
        </AutoCenter>
      </Card>
    </>
  )
}

export default LoginPage
