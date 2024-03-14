import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from "antd";
import { TopHeader } from "./components/Header";
import { MenuBar } from "./components/Menu";
import Home from "./components/Home";
import Protected from "./Protected";
import Auth from "./components/Auth";

import { HomeOutlined } from "@ant-design/icons";
import { DevBox } from "./components/DevBox";
import { DevBoxRequestForm } from "./components/DevBoxRequestForm";
import Login from "./components/Login";
import { DetailWindows } from "./components/DetailWindows";
import { DetailLinux } from "./components/DetailLinux";
import Activities from "./components/Activities";
import { KnowledgeBase } from "./components/KnowledgeBase";
import CapacityCalculation from "./components/CapacityCalculation";
import { Integrations } from "./components/Integrations";

const { Content, Footer, Sider } = Layout;

const App = () => {
  const history = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  console.log("colorBgContainer", colorBgContainer);
  const [authAuthenticated, setAuthAuthenticated] = useState(false);
  console.log("Auth.isAuthenticated", Auth.isAuthenticated());
  const getAuthAuthenticatedStatus = (status) => {
    setAuthAuthenticated(status);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto",
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {Auth.isAuthenticated() == true ? (
          <>
            {console.log("INSIDE")}
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={250}
              style={{ backgroundColor: "#fff" }}
            >
              <div
                class="demo-logo-vertical"
                style={{ display: collapsed ? "none" : "block" }}
              >
                <Link to={"/home"}>
                  <img
                    src={window.location.origin + "/logo.svg"}
                    style={{
                      height: "65px",
                      width: "250px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      color: "#0076ce",
                      background: "#fff",
                      padding: 22,
                    }}
                  />{" "}
                  <span
                    class="logo-Dell Technologies-text"
                    style={{ display: collapsed ? "none" : "block" }}
                  ></span>
                </Link>
              </div>

              <div
                class="demo-logo-vertical"
                style={{ display: collapsed ? "block" : "none" }}
              >
                <Link to={"/home"}>
                  <img
                    src={window.location.origin + "/Dell_Logo.png"}
                    style={{
                      height: "80px",
                      width: "80px",
                      marginTop: -5,
                      marginLeft: "auto",
                      marginRight: "auto",
                      color: "#0076ce",
                      background: "#fff",
                      padding: 22,
                    }}
                  />
                </Link>
              </div>

              <MenuBar />
            </Sider>
            <Layout>
              <TopHeader />
              <Content
                style={{
                  margin: "0 16px",
                }}
              >
                <Breadcrumb
                  style={{
                    margin: "16px 0",
                  }}
                >
                  <Breadcrumb.Item>
                    <HomeOutlined />
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
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <Home />
                        </Protected>
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
                      path="/detail/windows-server-2019"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <DetailWindows />
                        </Protected>
                      }
                    />

                    <Route
                      path="/detail/linux-8"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <DetailLinux />
                        </Protected>
                      }
                    />

                    <Route
                      path="/activities"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <Activities />
                        </Protected>
                      }
                    />

                    <Route
                      path="/knowledge-base"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <KnowledgeBase />
                        </Protected>
                      }
                    />

                    <Route
                      path="/capacity-calculation"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <CapacityCalculation />
                        </Protected>
                      }
                    />

                    <Route
                      path="/integrations"
                      element={
                        <Protected isLoggedIn={Auth.isAuthenticated()}>
                          <Integrations />
                        </Protected>
                      }
                    />

                    {/* <Route path='/login' element={<Login />}></Route> */}
                  </Routes>
                </div>
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                Design ©{new Date().getFullYear()} Created by Dell Technologies
              </Footer>
            </Layout>
          </>
        ) : (
          <Routes>
            <Route
              path={"*"}
              element={
                <Login isAuthAuthenticated={getAuthAuthenticatedStatus} />
              }
            />
          </Routes>
        )}
      </Layout>
    </ConfigProvider>
  );
};
export default App;
