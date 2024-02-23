import React, { useEffect, useState } from "react";
import {
  TeamOutlined,
  CalculatorOutlined,
  HomeOutlined,
  AppstoreOutlined,
  RiseOutlined,
  LogoutOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
import { Menu, ConfigProvider } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Auth from "./Auth";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const MenuBar = () => {
  const history = useNavigate();
  const [current, setCurrent] = useState("1");
  console.log("current", current);
  // const items = [
  //   getItem('Dashboard', 1, <HomeOutlined />),
  //   // getItem('Product Catalog', 'sub1', <AppstoreOutlined />, [
  //   //   getItem('Cache', 3),
  //   //   getItem('DevBox', 4),
  //   //   getItem('Compute', 5),
  //   //   getItem('Database', 6),
  //   //   getItem('Load Balancers', 7),
  //   //   getItem('Networking', 8),
  //   //   getItem('Block Storage', 9),
  //   //   getItem('Group File Share', 10),
  //   // ]),
  //   getItem('Transaction Status', 16, <CalculatorOutlined />),
  //   getItem('Capacity Calculation', 11, <CalculatorOutlined />),
  //   getItem('Integrations', 12, <InteractionOutlined />),
  //   getItem('User Administration', 13, <TeamOutlined />),
  //   getItem('Knowledge Base', 14, <RiseOutlined />),
  //   getItem('Logout', 15, <LogoutOutlined />),
  //   // getItem('Reporting', 6, <FileOutlined />),
  //   // getItem('Alerts', 7, <BellOutlined />),
  //   // getItem('User', 'sub1', <UserOutlined />, [
  //   //     getItem('Tom', '3'),
  //   //     getItem('Bill', '4'),
  //   //     getItem('Alex', '5'),
  //   // ]),
  //   // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   // getItem('Files', '9', <FileOutlined />),
  // ]
  const onClick = (e) => {
    setCurrent(e.key);
    // if (e.key == 4) {
    //   history('/devbox')
    // }else
    if (e.key == 2) {
      history("/transaction-status");
    } else if (e.key == 1) {
      history("/home");
    } else if (e.key == 6) {
      history("/knowledge-base");
    } else if (e.key == 7) {
      Auth.invalidate();
      history && history("/");
    } else {
      history("#");
    }
  };

  useEffect(() => {
    if (window.location.pathname == "/transaction-status") {
      setCurrent("2");
    }
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemSelectedBg: "#fc0",
          },
        },
      }}
    >
      {/* <Menu
        theme="dark"
        selectedKeys={[current]}
        defaultSelectedKeys={[current]}
        mode="inline"
        items={items}
        onClick={onClick}
      /> */}

      <Menu
        theme="dark"
        selectedKeys={[current]}
        defaultSelectedKeys={[current]}
        mode="inline"
        onClick={onClick}
      >
        <Menu.Item key="1">
          <HomeOutlined />
          <span>Dashboard</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2">
          <CalculatorOutlined />
          <span>Transaction Status</span>
          <Link to="/transacrion-status" />
        </Menu.Item>
        <Menu.Item key="3">
          <CalculatorOutlined />
          <span>Capacity Calculation</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="4">
          <InteractionOutlined />
          <span>Integrations</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="5">
          <TeamOutlined />
          <span>User Administration</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="6">
          <RiseOutlined />

          <Link to="/knowledge-base">
            <span>Knowledge Base</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <LogoutOutlined />
          <span>Logout</span>
          <Link to="/" />
        </Menu.Item>
      </Menu>
    </ConfigProvider>
  );
};
