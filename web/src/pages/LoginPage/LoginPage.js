import { useRef } from 'react'
import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Form, Input, Button, Card, Space, AutoCenter, Toast } from 'antd-mobile'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn, currentUser } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const formRef = useRef(null)

  const onSubmit = (data) => {
    const response = logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      Toast.show({
        icon: 'loading',
        content: response.message,
      })
    }
    else if (response.error) {
      Toast.show({
        icon: 'error',
        content: response.error,
      })
    }
    else {
      Toast.show({
        icon: 'success',
        content: 'Welcome back!',
      })
    }
  }


  return (
    <>
      <MetaTags title="Login" />

      <Form
        ref={formRef}
        onFinish={onSubmit}
      >
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button block color="primary" onClick={() => formRef.current.submit()}>
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
