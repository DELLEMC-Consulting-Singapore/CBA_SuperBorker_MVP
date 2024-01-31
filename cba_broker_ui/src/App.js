import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd'
import { TopHeader } from './components/Header'
import { MenuBar } from './components/Menu'
import Reporting from './components/Reporting'
import Home from './components/Home'
import Protected from './Protected'
import Auth from './components/Auth'

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  BellOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { DevBox } from './components/DevBox'
import { DevBoxRequestForm } from './components/DevBoxRequestForm'
import Login from './components/Login'
import TransactionStatus from './components/TransactionStatus'

const { Content, Footer, Sider } = Layout

const App = () => {
  const history = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [authAuthenticated, setAuthAuthenticated] = useState(false)
  console.log('Auth.isAuthenticated', Auth.isAuthenticated())
  const getAuthAuthenticatedStatus = (status) => {
    setAuthAuthenticated(status)
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
        },
      }}
    >
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        {Auth.isAuthenticated() == true ? (
          <>
            {console.log('INSIDE')}
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={250}
            >
              <div className="demo-logo-vertical">
                <Link
                  to={'/home'}
                  style={{ margin: collapsed ? '15px' : '80px' }}
                >
                  <img
                    src={window.location.origin + '/logo2.svg'}
                    style={{
                      height: '60px',
                      width: '40px',
                      'margin-left': 'auto',
                      'margin-right': 'auto',
                    }}
                  />{' '}
                  <span
                    className="logo-cba-text"
                    style={{ display: collapsed ? 'none' : 'block' }}
                  >
                    Commonwealth Bank
                  </span>
                </Link>
              </div>

              <MenuBar />
            </Sider>
            <Layout>
              <TopHeader />
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                <Breadcrumb
                  style={{
                    margin: '16px 0',
                  }}
                >
                  <Breadcrumb.Item>
                    <HomeOutlined /> / DevBox
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Login
                          isAuthAuthenticated={getAuthAuthenticatedStatus}
                        />
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <Home />
                        </Protected>
                      }
                    />
                    <Route
                      path="/devbox"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <DevBox />
                        </Protected>
                      }
                    />
                    <Route
                      path="/devbox/request-vm"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <DevBoxRequestForm />
                        </Protected>
                      }
                    />
                    
                    <Route
                      path="/transaction-status"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <TransactionStatus />
                        </Protected>
                      }
                    />
                    {/* <Route path='/login' element={<Login />}></Route> */}
                  </Routes>
                </div>
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                }}
              >
                Design ©{new Date().getFullYear()} Created by Dell Technologies
              </Footer>
            </Layout>
          </>
        ) : (
          <Routes>
            <Route
              path={'*'}
              element={
                <Login isAuthAuthenticated={getAuthAuthenticatedStatus} />
              }
            />
          </Routes>
        )}
      </Layout>
    </ConfigProvider>
  )
}
export default App
