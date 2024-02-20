import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;

export const DevBox = () => {
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
          <div class="dds__icon--round">
            <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--round-color"></i>
          </div>

          <Paragraph
            style={{
              "font-weight": "normal",
              "font-size": "42px",
              margin: "10px 0px 0px 50px",
            }}
          >
            DevBox
          </Paragraph>
        </div>
      </Card>

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <Link to={"/detail/windows-server-2019"}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              cover={
                <img
                  alt="example"
                  src={window.location.origin + "/products/win2016.png"}
                  className="product-catalog-card-grid-img"
                />
              }
              actions={[
                <Link to={"/detail/windows-server-2019"}>
                  <a class="anchor-tag">
                    Request Service
                    <i
                      class="dds__icon--arrow-right"
                      style={{
                        cursor: "pointer",
                        "font-size": "20px",
                      }}
                    ></i>
                  </a>
                </Link>,
              ]}
              bodyStyle={{ height: 120 }}
            >
              <h5
                style={{
                  color: "#0e0e0e",
                  "font-size": "20px",
                  "font-weight": "400",
                  margin: 0,
                }}
              >
                Windows 2019
              </h5>
              <Paragraph
                style={{
                  color: "#0e0e0e",
                  "font-size": "16px",
                  margin: 0,
                }}
              >
                Get a Windows 2019 for a span of 7 days for Development use
              </Paragraph>
            </Card>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{ paddingLeft: 50, paddingRight: 16 }}
        >
          <Link to={"/detail/linux-8"}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              cover={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    alt="example"
                    src={window.location.origin + "/products/redhat.png"}
                    className="product-catalog-card-grid-linux-img"
                  />
                  {/* <h2 style={{ margin: -15 }}>RedHat</h2> */}
                </div>
              }
              actions={[
                <Link to={"/detail/linux-8"}>
                  <a class="anchor-tag">
                    Request Service
                    <i
                      class="dds__icon--arrow-right"
                      style={{
                        cursor: "pointer",
                        "font-size": "20px",
                      }}
                    ></i>
                  </a>
                </Link>,
              ]}
              bodyStyle={{ height: 120 }}
            >
              <h5
                style={{
                  color: "#0e0e0e",
                  "font-size": "20px",
                  "font-weight": "400",
                  margin: 0,
                }}
              >
                RedHat Linux 8x
              </h5>
              <Paragraph
                style={{
                  color: "#0e0e0e",
                  "font-size": "16px",
                  margin: 0,
                }}
              >
                Coming Soon
              </Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
};
