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
      console.log('values', value)
      //console.log('URL : ', window._env_.API_URL);
      message.loading({
        content: 'Loading...',
        style: {
          marginTop: '5vh',
        },
        duration: 1,
      })
      await Auth.authenticate(value.username, value.password).catch((err) => {
        if (err) {
          errorMsg('User Email/Password Incorrect')
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
            //    bodyStyle={{backgroundColor: '', border: 0,width:'500px' }}
            // bodyStyle={{backgroundImage:'url(https://miro.medium.com/v2/resize:fit:1100/format:webp/0*WsWN7LCn6zwplYr4.jpeg)',backgroundRepeat:'repeat'}}
          >
            <Col>
              <Content>
                {/* <div style={{ textAlign: 'center', padding: '15px' }}>
                <img
                  alt='Dell'
                  width={110}
                  height={70}
                  src={window.location.origin + '/Dell-Logo.png'}
                />
              </div> */}

                <div class="MuiStack-root css-kl5oqq">
                  <img
                    src={window.location.origin + '/logo2.svg'}
                    alt="CommSec"
                    width="225"
                    height="64"
                  />
                </div>

                <StyledForm
                  name="basic"
                  layout="vertical"
                  onFinish={onSubmit}
                  style={{ padding: '25px 50px' }}
                >
                  <FormItem
                    // label='User Email'
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </FormItem>

                  <FormItem
                    // label='Password'
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Password
                      placeholder="Password"
                      // style={{
                      //   borderRadius: '4px',
                      //   border: '1px solid #aaaaaa',
                      //   padding: '2px 10px 2px 1px',
                      // }}
                    />
                  </FormItem>
                  {/* <div style={{ float: 'right' }}> <Link to='/register' > 
                  Register
                  </Link>
                </div> */}

                  <Form.Item {...tailLayout}>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      class="button-css"
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
    //props.isAuthAuthenticated(true);
    return null
  } else {
    console.log('PROPS', props)
    props.isAuthAuthenticated(false)
    return <LoginForm />
  }
}
export default Login
