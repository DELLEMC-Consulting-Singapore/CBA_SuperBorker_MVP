import React from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Progress,
  Space,
  notification,
  Button,
  Modal,
  Alert,
} from "antd";
import { Link } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
const { Meta } = Card;
const { Paragraph } = Typography;

const config = {
  title: "",
  content: (
    <>
      CBA's Ansible infrastructure configuration management platform is not
      available due to the emergency change activity. Respective teams are
      actively working to bring up the Ansible Tower interface. If you need
      details, please refer to the incident INC289112 for more details. Or, you
      can send an email to&nbsp;
      <span>
        <a href="mailto:ansible_automation@cba.com.au">
          ansible_automation@cba.com.au
        </a>
      </span>
    </>
  ),
};

const Home = (props) => {
  console.log(props);
  // const [api, contextHolder] = notification.useNotification();
  // const openNotificationWithIcon = (type) => {
  //   api[type]({
  //     message: "",
  //     description:
  //       "CBA's Ansible infrastructure configuration management platform is not available due to the emergency change activity. Respective teams are actively working to bring up the Ansible Tower interface. If you need details, please refer to the incident INC289112 for more details. Or, you can send an email to ansible_automation@cba.com.au</a>",
  //   });
  // };

  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      {contextHolder}
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
        Open Service Broker - Dashboard
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

      <Card
        style={
          props["collapsed"]
            ? {
                width: 750,
                position: "relative",
                left: "55%",
                transform: "translate(-60%, 0%)",
                border: "3px solid #f0f0f0",
              }
            : {
                width: 750,
                position: "relative",
                left: "50%",
                transform: "translate(-50%, 0%)",
                border: "3px solid #f0f0f0",
              }
        }
      >
        <Row gutter={16}>
          <Col span={8} style={{ paddingLeft: 20, paddingRight: 0 }}>
            <Space style={{ "flex-direction": "column-reverse" }}>
              <h3>% of Running Requests</h3>
              <Progress
                type="circle"
                percent={20}
                strokeColor="geekblue"
                status="normal"
              />
            </Space>
          </Col>
          <Col span={8} style={{ paddingLeft: 25, paddingRight: 0 }}>
            <Space style={{ "flex-direction": "column-reverse" }}>
              <h3>% of Completed Requests</h3>
              <Progress
                type="circle"
                percent={72}
                strokeColor="green"
                status="normal"
              />
            </Space>
          </Col>
          <Col span={8} style={{ paddingLeft: 45, paddingRight: 0 }}>
            <Space style={{ "flex-direction": "column-reverse" }}>
              <h3>% of Failed Requests</h3>
              <Progress
                type="circle"
                percent={8}
                strokeColor="red"
                status="normal"
              />
            </Space>
          </Col>
        </Row>
        <Row>
          <Alert
            message="Past 24 hours"
            type="info"
            style={{ fontSize: 10 }}
            showIcon
            banner
          />
        </Row>
      </Card>

      <Card
        style={{ width: "100%", border: "3px solid #f0f0f0", marginTop: 15 }}
        bodyStyle={{ padding: 10 }}
      >
        <div style={{ marginLeft: 130 }}>
          <div>
            <Typography.Title
              level={1}
              style={{
                textAlign: "center",
                "font-size": "20px",
                "font-weight": "600",
                "font-stretch": "normal",
                "line-height": "1.05",
                color: "#565656",
                "text-align": "center",
                marginRight: 180,
              }}
            >
              Integrations & Tools Availability
            </Typography.Title>
          </div>
          <div style={{ marginTop: 25, marginLeft: 40 }}>
            <Row gutter={16}>
              <Col span={5}>
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
                              window.location.origin +
                              "/products/AriaAutomation.png"
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
              <Col span={5}>
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
                            src={
                              window.location.origin + "/products/Puppet.jpg"
                            }
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

              <Col span={5}>
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
                            src={
                              window.location.origin + "/products/Qualys.png"
                            }
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

              <Col span={5}>
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
                            src={
                              window.location.origin +
                              "/products/ServiceNow.png"
                            }
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
            </Row>

            <Row gutter={16} style={{ marginTop: 15 }}>
              <Col span={5}>
                <Link
                  onClick={async () => {
                    modal.error(config);
                  }}
                >
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
                            src={
                              window.location.origin + "/products/Ansible.png"
                            }
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
              <Col span={5}>
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

              <Col span={5}>
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
              <Col span={5}>
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

              {/* <Col span={4}>
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
        </Col> */}
            </Row>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Home;
