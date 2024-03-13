import React, { useEffect, useState } from "react";
import {
  CalculatorOutlined,
  HomeOutlined,
  RiseOutlined,
  LogoutOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
import { Menu, ConfigProvider } from "antd";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import Auth from "./Auth";

export const MenuBar = () => {
  const history = useNavigate();
  const [current, setCurrent] = useState("1");
 
  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key == 2) {
      history("/transaction-status");
    } else if (e.key == 1) {
      history("/home");
    } else if (e.key == 6) {
      history("/knowledge-base");
    } else if (e.key == 3) {
      history("/capacity-calculation");
    } else if (e.key == 4) {
      history("/integrations");
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
        </Menu.Item>
        <Menu.Item key="4">
          <InteractionOutlined />
          <span>Integrations</span>
        </Menu.Item>

        <Menu.Item key="6">
          <RiseOutlined />
          <span>Knowledge Base</span>
          <Link to="/" />
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
