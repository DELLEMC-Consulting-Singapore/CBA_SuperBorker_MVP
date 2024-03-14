import React from "react";
import {
  Card,
  Typography,
  Button,
  Tabs,
  theme,
  ConfigProvider,
  Tag,
} from "antd";
import { Link } from "react-router-dom";
import { ApiDocs } from "./ApiDocs";
import { Support } from "./Support";
import { RatingLinux } from "./RatingLinux";
import { ServiceDetailLinux } from "./ServiceDetailLinux";

const { Paragraph } = Typography;

const items = [
  {
    label: `Service Details`,
    key: 0,
    children: <ServiceDetailLinux />,
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
    children: <RatingLinux />,
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

export const DetailLinux = () => {
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
          <div class="dds__icon--round-detail-linux">
            <img
              alt="example"
              src={window.location.origin + "/products/redhat.png"}
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
                RedHat Linux 8x
              </Paragraph>
              <Paragraph
                style={{
                  "font-weight": "normal",
                  "font-size": "20px",
                  margin: "10px 0px 0px 50px",
                }}
              >
                <Tag color="success" key="Coming Soon">
                  Coming Soon
                </Tag>
              </Paragraph>
            </div>
            <div style={{ position: "absolute", right: "80px", top: "50px" }}>
              <Link to="/devbox/request-vm?os=red-hat-8x">
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
