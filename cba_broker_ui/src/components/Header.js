import React, { useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Layout, theme } from "antd";
import Auth from "./Auth";
const { Header } = Layout;

export const TopHeader = () => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [username, setUserProfile] = useState("");

  const userContext = () => {
    Auth.getUserProfile()
      .then((resp) => {
        console.log("show full::", resp);
        setUserProfile(capitalizeFirstLetter(resp.username));
      })
      .catch((error) => {
        // console.log("here::",error)
      });
  };

  useEffect(() => {
    if (Auth.isAuthenticated()) {
      userContext();
    }
  }, []);

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <span class="digital-cloud-header">OSB Console</span>
      <span
        style={{
          position: "absolute",
          right: "20px",
        }}
      >
        <UserOutlined
          style={{
            height: "60px",
            fontSize: "30px",
          }}
        />
        <span>{username}</span>
      </span>
    </Header>
  );
};
