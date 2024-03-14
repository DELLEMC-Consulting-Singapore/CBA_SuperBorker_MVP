import React from "react";
import { Card, Typography, Button, Tabs, theme, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import { ServiceDetailWindows } from "./ServiceDetailWindows";
import { ApiDocs } from "./ApiDocs";
import { Support } from "./Support";
import { Rating } from "./Rating";

const { Paragraph } = Typography;

const items = [
  {
    label: `Service Details`,
    key: 0,
    children: <ServiceDetailWindows></ServiceDetailWindows>,
    style: {
      height: "auto",
    },
  },
  {
    label: `API Docs`,
    key: 1,
    children: <ApiDocs />,
  },
  {
    label: "Support",
    key: 2,
    children: <Support />,
  },
  {
    label: "Rating",
    key: 3,
    children: <Rating />,
  },
];

const renderTabBar = (props, DefaultTabBar) => (
  <>
    <DefaultTabBar
      {...props}
      // style={{
      //   background: colorBgContainer,
      // }}
    />
  </>
);

export const DetailWindows = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Card
        style={{
          width: "100%",
          "min-height": "11rem",
          padding: "0",
          "background-color": "#f7f7f7",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "30px",
          }}
        >
          <div class="dds__icon--round-detail">
            <img
              alt="example"
              src={window.location.origin + "/products/win2016.png"}
              className="product-catalog-card-grid-img-detail"
            />
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <Paragraph
                style={{
                  "font-weight": "normal",
                  "font-size": "42px",
                  margin: "10px 0px 0px 50px",
                }}
              >
                Windows 2019
              </Paragraph>
              <Paragraph
                style={{
                  "font-weight": "normal",
                  "font-size": "20px",
                  margin: "10px 0px 0px 50px",
                }}
              >
                Get a Windows 2019 for a span of 7 days for Development use
              </Paragraph>
            </div>
            <div style={{ position: "absolute", right: "80px", top: "50px" }}>
              <Link to="/devbox/request-vm?os=windows-server-2019">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="button-css"
                >
                  Request Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#0076ce",
            // Alias Token
          },
        }}
      >
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={items} />
      </ConfigProvider>
    </>
  );
};
