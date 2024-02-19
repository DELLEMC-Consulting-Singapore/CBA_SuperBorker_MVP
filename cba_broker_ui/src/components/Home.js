import React from "react";
import { Typography, Card, Row, Col, Progress, Space } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
const { Meta } = Card;
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
        Open Service Broker
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
        The Open Service Broker API connects the Developers to CBA's ecosystem
        of services & platforms
      </Paragraph>

      {/* <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        hoverable={false}
      >
        <Skeleton avatar loading={false}>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Cache"
            description="This is the description"
          />
        </Skeleton>
      </Card> */}
      <Row
        gutter={16}
        style={{
          "margin-left": "190px",
          "margin-right": "-40px",
          "padding-top": "30px",
          "padding-bottom": "45px",
        }}
      >
        <Col span={6}>
          <Space style={{ "flex-direction": "column-reverse" }}>
            <h3>Running</h3>
            <Progress
              type="circle"
              percent={20}
              strokeColor="geekblue"
              status="normal"
            />
          </Space>
        </Col>
        <Col span={6}>
          <Space style={{ "flex-direction": "column-reverse" }}>
            <h3>Completed</h3>
            <Progress
              type="circle"
              percent={72}
              strokeColor="green"
              status="normal"
            />
          </Space>
        </Col>
        <Col span={6}>
          <Space style={{ "flex-direction": "column-reverse" }}>
            <h3>Failed</h3>
            <Progress
              type="circle"
              percent={8}
              strokeColor="red"
              status="normal"
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={250}>
        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="AriaAutomation"
                      src={
                        window.location.origin + "/products/AriaAutomation.png"
                      }
                      style={{
                        width: "120px",
                        padding: "10px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "unset",
                        "margin-left": "20px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--cloud-document dds__icon--color"></i> */}

              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "5px",
                  "margin-right": "auto",
                }}
              >
                Aria Automation
              </Paragraph>

              {/* <Paragraph>
                In computing, a cache is a high-speed data storage layer which stores a subset ...
              </Paragraph> */}
            </Card>
          </Link>
        </Col>
        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="Puppet"
                      src={window.location.origin + "/products/Puppet.jpg"}
                      style={{
                        width: "120px",
                        padding: "5px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "20px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "40px",
                  "margin-right": "auto",
                }}
              >
                Puppet
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="Qualys"
                      src={window.location.origin + "/products/Qualys.png"}
                      style={{
                        width: "120px",
                        padding: "15px 1px 0px 25px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "20px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "40px",
                  "margin-right": "auto",
                }}
              >
                Qualys
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="ServiceNow"
                      src={window.location.origin + "/products/ServiceNow.png"}
                      style={{
                        width: "120px",
                        padding: "5px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "20px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "20px",
                  "margin-right": "auto",
                }}
              >
                ServiceNow
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="Ansible"
                      src={window.location.origin + "/products/Ansible.png"}
                      // style={{
                      //   width: "200px",
                      //   padding: "5px 0px 0px 0px",
                      //   position: "relative",
                      //   "min-width": "unset!important",
                      //   "min-height": "102px",
                      //   "margin-left": "-5px",
                      //   "margin-right": "auto",
                      // }}
                      className="ansible"
                    />
                  </div>
                  <div>
                    <CloseCircleFilled className="tool-check-error" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "25px",
                  "margin-right": "auto",
                }}
              >
                Ansible
              </Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>

      <Row gutter={250} style={{ marginTop: 15 }}>
        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="NSX"
                      src={window.location.origin + "/products/NSX.png"}
                      style={{
                        width: "100px",
                        padding: "5px 0px 0px 0px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "40px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "40px",
                  "margin-right": "auto",
                }}
              >
                NSX
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="AWS"
                      src={window.location.origin + "/products/AWS.jpg"}
                      style={{
                        width: "120px",
                        padding: "10px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "25px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--cloud-document dds__icon--color"></i> */}

              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "50px",
                  "margin-right": "auto",
                }}
              >
                AWS
              </Paragraph>

              {/* <Paragraph>
                In computing, a cache is a high-speed data storage layer which stores a subset ...
              </Paragraph> */}
            </Card>
          </Link>
        </Col>
        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="Azure"
                      src={window.location.origin + "/products/ANZ.png"}
                      style={{
                        width: "120px",
                        padding: "5px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "25px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "50px",
                  "margin-right": "auto",
                }}
              >
                Azure
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="Kubernetes"
                      src={window.location.origin + "/products/Kubernetes.png"}
                      style={{
                        width: "140px",
                        padding: "5px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "12px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "25px",
                  "margin-right": "auto",
                }}
              >
                Kubernetes
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col span={4}>
          <Link to={"/"}>
            <Card
              hoverable
              style={{
                width: 190,
                justifyContent: "center",
                border: "2px solid #f0f0f0",
                height: 175,
              }}
              cover={
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      alt="TeamCity"
                      src={window.location.origin + "/products/TeamCity.png"}
                      style={{
                        width: "120px",
                        padding: "5px 0px 0px 20px",
                        position: "relative",
                        "min-width": "unset!important",
                        "min-height": "102px",
                        "margin-left": "30px",
                        "margin-right": "auto",
                      }}
                    />
                  </div>
                  <div>
                    <CheckCircleFilled className="tool-check" />
                  </div>
                </div>
              }
            >
              {/* <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i> */}
              <Paragraph
                style={{
                  "font-weight": "630",
                  "font-size": "17px",
                  "margin-left": "30px",
                  "margin-right": "auto",
                }}
              >
                TeamCity
              </Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Home;
