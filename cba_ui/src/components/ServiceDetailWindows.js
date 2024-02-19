import React from "react";
import { Col, Layout, Row } from "antd";

export const ServiceDetailWindows = () => {
  return (
    <>
      <Layout style={{ background: "#fff" }}>
        <div>
          <h1 className="service-detail-overview-heading">Overview</h1>
        </div>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={16}>
            <p>
              Windows Server 2019 is the cloud-ready operating system that
              supports your current workloads while introducing new technologies
              that make it easy to transition to cloud computing when you are
              ready. Currently Dell IT-supported if Windows Server 2019 is
              deemed to be incompatible.
              <br />
              <br />
              1. For VM Support - Go to <a href=""> MYIT </a> - -&gt; Create
              Incident and Choose VMWare (33773) as the product. <br /> <br />
              2. For VM Provisioning Support - Go to <a href=""> MYIT </a> -&gt;
              Create Incident and Choose VMWare - vRealize suite (364528) as the
              product.
              <br /> <br />
              <br />
              For custom sized vm fill out <a href="">SNOW Request</a>
            </p>
          </Col>
          <Col span={8} push={0}>
            <div _ngcontent-nbg-c284="" class="version">
              <p _ngcontent-nbg-c284="">
                {" "}
                Version: <strong _ngcontent-nbg-c284="">2019</strong>
              </p>
            </div>
            <div _ngcontent-qwl-c284="" class="highlights">
              <p _ngcontent-qwl-c284="">This service features:</p>
              <ul _ngcontent-qwl-c284="">
                <li _ngcontent-qwl-c284="">
                  TCP Performance improvements related to improvements to
                  Initial Congestion Window &amp; implementation of TCP Fast
                  Open
                </li>
                <li _ngcontent-qwl-c284="">
                  Cluster Rolling Upgrades (help migrate Clusters with zero
                  downtime from 2008 R2/2012)
                </li>
                <li _ngcontent-qwl-c284="">Failover Clustering Improvements</li>
                <li _ngcontent-qwl-c284="">
                  Support for Storage Spaces Direct
                </li>
                <li _ngcontent-qwl-c284="">
                  Support for Windows Docker Containers
                </li>
                <li _ngcontent-qwl-c284="">
                  Enhanced Support for Remote Management &amp; Administration
                  via Windows Admin Center
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        {/* <Layout>
          <Sider>left sidebar</Sider>
          <Content>main content</Content>
          <Sider>right sidebar</Sider>
        </Layout>
        <Footer>footer</Footer> */}
      </Layout>
    </>
  );
};
