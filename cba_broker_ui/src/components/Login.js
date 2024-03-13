import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, message, Row, Col, Layout, Card } from 'antd'
import styled from 'styled-components'
import Auth from './Auth'

const { Content } = Layout

const StyledForm = styled(Form)`
  .ant-input {
    font-size: 15px !important;
  }
`

const Password = styled(Input.Password)`
  .ant-input {
    border: none !important;
    font-size: 5px 2px !important;
  }
`

const FormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-size: 14px !important;
  }
`

const Login = (props) => {
  const history = useNavigate()

  const LoginForm = () => {
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    }

    const errorMsg = (msg) => {
      message.error({
        content: msg,
        style: {
          marginTop: '5vh',
        },
        duration: 2,
      })
    }

    const onSubmit = async (value) => {
      message.loading({
        content: 'Loading...',
        style: {
          marginTop: '5vh',
        },
        duration: 1,
      })
      await Auth.authenticate(value.username, value.password).catch((err) => {
        if (err) {
          errorMsg('Unauthorized access')
        }
      })
      //  if(true){
      if (Auth.isAuthenticated()) {
        history('/home')
        message.destroy()
        props.isAuthAuthenticated(true)
      } else {
        props.isAuthAuthenticated(false)
      }
    }

    return (
      <div class="bg-img login-form-background">
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: '100vh' }}

          // span={36}
        >
          <Card
            style={{ width: '460px', height: '100%' }}
          >
            <Col>
              <Content>
                <div class="MuiStack-root css-kl5oqq">
                  <img
                    src={window.location.origin + '/logo2.svg'}
                    alt="CommSec"
                    width="225"
                    height="64"
                    style={{
                      padding: '0px 0px 0px 0px',
                      margin: '0px 85px',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 'larger',
                      fontWeight: '800',
                      padding: '0px 0px 0px 120px',
                    }}
                  >
                    Commonwealth Bank
                  </span>
                  <span
                    style={{
                      fontSize: 'larger',
                      fontWeight: '800',
                      padding: '0px 0px 0px 122px',
                    }}
                  >
                   Open Service Broker
                  </span>
                </div>

                <StyledForm
                  name="basic"
                  layout="vertical"
                  onFinish={onSubmit}
                  style={{ padding: '10px 35px' }}
                >
                  <FormItem
                    // label='User Email'
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your LAN User ID!',
                      },
                    ]}
                  >
                    <Input placeholder="LAN User ID" autoComplete="off" />
                  </FormItem>

                  <FormItem
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your LAN password!',
                      },
                    ]}
                  >
                    <Password
                      autoComplete="off"
                      placeholder="LAN Password"
                    />
                  </FormItem>

                  <Form.Item {...tailLayout}>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      class="button-css"
                      style={{
                        'background-color': '#fc0',
                        color: '#231f20',
                        margin:"15px"
                      }}
                    >
                      Login
                    </Button>
                  </Form.Item>
                </StyledForm>
              </Content>
            </Col>
          </Card>
        </Row>
      </div>
    )
  }
  console.log('show props::', props)
  if (Auth.isAuthenticated()) {
    history('/home')
    return null
  } else {
    console.log('PROPS', props)
    props.isAuthAuthenticated(false)
    return <LoginForm />
  }
}
export default Login
