import React from "react";
import { Typography, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

const Home = () => {
  return (
    <>
      <Typography.Title
        level={1}
        style={{
          textAlign: "center",
          "font-size": "3rem",
          "font-weight": "400",
          "font-stretch": "normal",
          "line-height": "1.05",
          color: "#565656",
          "text-align": "center",
          margin: "2rem 0",
          width: "100%",
        }}
      >
        Products
      </Typography.Title>

      <Paragraph
        style={{
          "font-size": "1.25rem",
          "font-weight": "400",
          "line-height": "1.66",
          padding: "0 4.5rem",
          "margin-top": ".875rem",
          color: "#000",
          "text-align": "center",
          "margin-bottom": "24px",
        }}
      >
        The services under below product catalogs are available for self-service
        on the Dell Technologies Digital Cloud
      </Paragraph>
      <Row justify="center">
        <Col
          xs={{
            span: 4,
            offset: 1,
          }}
          lg={{
            span: 6,
            offset: 1,
          }}
        >
          <Link to={"/devbox"}>
            <Card hoverable style={{ width: 240, justifyContent: "center" }}>
              <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i>
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "25px",
                  margin: "0",
                }}
              >
                DevBox
              </Paragraph>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ width: 240, justifyContent: "center" }}>
            <i class="dds__icon dds__icon--virtualization dds__icon--color"></i>
            <Paragraph
              style={{
                "font-weight": "630",
                "font-size": "25px",
                margin: "0",
              }}
            >
              VMaas
            </Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ width: 240, justifyContent: "center" }}>
            <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i>

            <Paragraph
              style={{
                "font-weight": "630",
                "font-size": "25px",
                margin: "0",
              }}
            >
              SQL Clusters
            </Paragraph>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }} justify="center">
        <Col
          xs={{
            span: 4,
            offset: 1,
          }}
          lg={{
            span: 6,
            offset: 1,
          }}
        >
          <Card hoverable style={{ width: 240, justifyContent: "center" }}>
            <i class="dds__icon dds__icon--network-vert dds__icon--color"></i>

            <Paragraph
              style={{
                "font-weight": "630",
                "font-size": "25px",
                margin: "0",
              }}
            >
              Networking
            </Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ width: 240, justifyContent: "center" }}>
            <i class="dds__icon dds__icon--device-storage-array dds__icon--color"></i>

            <Paragraph
              style={{
                "font-weight": "630",
                "font-size": "25px",
                margin: "0",
              }}
            >
              Block Storage
            </Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ width: 240, justifyContent: "center" }}>
            <i class="dds__icon dds__icon--share dds__icon--color"></i>

            <Paragraph
              style={{
                "font-weight": "630",
                "font-size": "25px",
                margin: "0",
              }}
            >
              Group File Share
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
