import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, useNavigate
} from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import { TopHeader } from './components/Header';
import { MenuBar } from './components/Menu';
import Reporting from './components/Reporting';
import Home from './components/Home';


import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  BellOutlined,
  HomeOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { DevBox } from './components/DevBox';
import { DevBoxRequestForm } from './components/DevBoxRequestForm';


const { Content, Footer, Sider } = Layout;

const App = () => {
  const history = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
        <div className="demo-logo-vertical" ><Link to={"/"}><img src={window.location.origin + '/logo2.svg'} style = {{
    height: "60px",
    width: "40px",
    "margin-left": "auto",
    "margin-right":"auto"
}}/></Link></div>

        
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
            <Breadcrumb.Item><HomeOutlined /> / DevBox</Breadcrumb.Item>
            
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
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/devbox" element={<DevBox />} />
              <Route path="/devbox/request-vm" element={<DevBoxRequestForm />} />
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
    </Layout>
    
        </ConfigProvider>
  );
};
export default App;