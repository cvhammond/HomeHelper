import { useRef } from 'react'
import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Form, Input, Button, Card, Space, AutoCenter, Toast } from 'antd-mobile'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()
  const formRef = useRef(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await signUp({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      Toast.show({
        icon: 'loading',
        content: response.message,
      })
    } else if (response.error) {
      Toast.show({
        icon: 'error',
        content: response.error,
      })
    } else {
      // user is signed in automatically
      Toast.show({
        icon: 'success',
        content: 'Welcome!',
      })
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <Form ref={formRef} onFinish={onSubmit}>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button block color="primary" onClick={() => formRef.current.submit()}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <Card>
        <AutoCenter>
          <Space>
            <Button onClick={() => navigate(routes.login())}>Already have an account?</Button>
          </Space>
        </AutoCenter>
      </Card>
    </>
  )
}

export default SignupPage
