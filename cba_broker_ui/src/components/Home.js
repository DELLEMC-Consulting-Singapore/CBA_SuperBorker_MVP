import React from 'react'
import { Typography, Card, Row, Col, Progress, Space } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const { Paragraph } = Typography;

const Home = () => {
  return (
    <>
    <Typography.Title
        level={1}
        style={{
          textAlign:"center",
          "font-size": "3rem",
          "font-weight": "400",
          "font-stretch": "normal",
          "line-height": "1.05",
          color: "#565656",
          "text-align": "center",
          "margin": "2rem 0",
          width: "100%"
        }}
      >
        Open Service Broker
    </Typography.Title>

    <Paragraph style={{
      "font-size": "1.25rem",
    "font-weight": "400",
    "line-height": "1.66",
    "padding": "0 4.5rem",
    "margin-top": ".875rem",
    "color": "#000",
    "text-align": "center",
        "margin-bottom": "24px"
    }}>
      The Open Service Broker API connects the Developers to CBA's ecosystem of services & platforms
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
      <Row gutter={16} style={{"margin-left": "190px","margin-right": "-40px","padding-top": "30px","padding-bottom": "45px"}}>
        <Col span={6}>
          <Space style={{"flex-direction": "column-reverse"}}>
            <h3>Running</h3>
            <Progress type="circle" percent={20} strokeColor="geekblue" status="normal"/>
          </Space>
        </Col>
        <Col span={6}>
        <Space style={{"flex-direction": "column-reverse"}}>
          <h3>Completed</h3>
            <Progress type="circle" percent={72} strokeColor="green" status="normal"/>
          </Space>
        </Col>
        <Col span={6}>
        <Space style={{"flex-direction": "column-reverse"}}>
        <h3>Failed</h3>
            <Progress type="circle" percent={8} strokeColor="red" status="normal"/>
          </Space>
        </Col>
        </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Card
              hoverable
              style={{ width: 240, justifyContent:"center" }}
              // cover={<img alt="example" src={window.location.origin + '/products/Cache.png'} style={{
              //   "width":"120px",
              //   "padding":"5px 0px 0px 20px",
              //   "position": "relative",
              //   "min-width": "unset!important",
              //   "min-height": "unset",
              //   transform: "unset",
              //   "justify-content": "center"
              // }}/>}
            >
              <i class="dds__icon dds__icon--cloud-document dds__icon--color"></i>

              <Paragraph style={{
                "font-weight":"630",
                "font-size":"25px",
                "margin": "0"
              }}>
                Cache
              </Paragraph>

              {/* <Paragraph>
                In computing, a cache is a high-speed data storage layer which stores a subset ...
              </Paragraph> */}

            </Card>
        </Col>
        <Col span={6}>
          {/* <Link to={"/devbox"}> */}
              <Card
              hoverable
              style={{ width: 240, justifyContent:"center" }}
            >
            <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i>
              <Paragraph style={{
                "font-weight":"630",
                "font-size":"25px",
                "margin": "0"
              }}>
                DevBox
              </Paragraph>

            </Card>
          {/* </Link> */}
          
        </Col>
        <Col span={6}>
          <Card
              hoverable
              style={{ width: 240, justifyContent:"center" }}
            >
              <i class="dds__icon dds__icon--virtualization dds__icon--color"></i>
              <Paragraph style={{
                "font-weight":"630",
                "font-size":"25px",
                "margin": "0"
              }}>
                VMaas
              </Paragraph>

            </Card>
        </Col>
        <Col span={6}>
          <Card
              hoverable
              style={{ width: 240, justifyContent:"center" }}
            >
              <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--color"></i>
              {/* <img alt="example" src={window.location.origin + '/products/compute.svg'} height={95}/> */}
              <Paragraph style={{
                "font-weight":"630",
                "font-size":"25px",
                "margin": "0"
              }}>
                SQL Clusters
              </Paragraph>

            </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{marginTop: 16}}>
        <Col span={6}>
            <Card
                  hoverable
                style={{ width: 240, justifyContent:"center" }}
              >
                <i class="dds__icon dds__icon--scale dds__icon--color"></i>
                {/* <img alt="example" src={window.location.origin + '/products/compute.svg'} height={95}/> */}
                <Paragraph style={{
                  "font-weight":"630",
                  "font-size":"25px",
                  "margin": "0"
                }}>
                  F5 LB
                </Paragraph>

              </Card>
        </Col>
        <Col span={6}>
            <Card
                  hoverable
                style={{ width: 240, justifyContent:"center" }}
              >
                <i class="dds__icon dds__icon--network-vert dds__icon--color"></i>
                {/* <img alt="example" src={window.location.origin + '/products/compute.svg'} height={95}/> */}
                <Paragraph style={{
                  "font-weight":"630",
                  "font-size":"25px",
                  "margin": "0"
                }}>
                  Netwoking
                </Paragraph>

              </Card>
        </Col>
        <Col span={6}>
            <Card
                  hoverable
                style={{ width: 240, justifyContent:"center" }}
              >
                <i class="dds__icon dds__icon--device-storage-array dds__icon--color"></i>
                {/* <img alt="example" src={window.location.origin + '/products/compute.svg'} height={95}/> */}
                <Paragraph style={{
                  "font-weight":"630",
                  "font-size":"25px",
                  "margin": "0"
                }}>
                  Block Storage
                </Paragraph>

              </Card>
        </Col>
        <Col span={6}>
            <Card
                  hoverable
                style={{ width: 240, justifyContent:"center" }}
              >
                <i class="dds__icon dds__icon--share dds__icon--color"></i>
                {/* <img alt="example" src={window.location.origin + '/products/compute.svg'} height={95}/> */}
                <Paragraph style={{
                  "font-weight":"630",
                  "font-size":"25px",
                  "margin": "0"
                }}>
                  Group File Share
                </Paragraph>

              </Card>
        </Col>
      </Row>
        
    </>
  )
}

export default Home;
