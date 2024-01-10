import React from 'react'

import {
  UserOutlined,
} from '@ant-design/icons';
import { Layout, theme } from 'antd';
const { Header } = Layout;

export const TopHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        <span class="digital-cloud-header">Digital Cloud</span>
       <span style={{position: "absolute",
    right: "0", width:"60px", height:"60px", fontSize:"30px"}}><UserOutlined /></span>

        </Header>
  )
}
