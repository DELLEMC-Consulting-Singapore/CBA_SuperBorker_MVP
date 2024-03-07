import React from "react";
import { Col, Layout, Row } from "antd";

export const ServiceDetailLinux = () => {
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
              The RedHat Linux operating system is engineered for open cloud
              infrastructure. It delivers leading performance, scalability,
              reliability and security for enterprise SaaS and PaaS workloads as
              well as traditional enterprise applications. Current Dell IT
              Supported Version of RedHat Linux Server. Please see the
              highlights sections for latest features of this version.
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
                Version: <strong _ngcontent-nbg-c284="">RedHat Linux 8x</strong>
              </p>
            </div>
            <div _ngcontent-qwl-c284="" class="highlights">
              <p _ngcontent-qwl-c284="">This service features:</p>
              <ul _ngcontent-uce-c300="">
                <li _ngcontent-uce-c300="">
                  RedHat Linux 8 Software Distribution and Management
                </li>
                <li _ngcontent-uce-c300="">
                  Installation, Boot, and Image Creation
                </li>
                <li _ngcontent-uce-c300="">Red Hat Compatible Kernel</li>
                <li _ngcontent-uce-c300="">Cockpit</li>
                <li _ngcontent-uce-c300="">Database</li>
                <li _ngcontent-uce-c300="">Developer Tools and Compilers</li>
                <li _ngcontent-uce-c300="">File Systems and Storage</li>
                <li _ngcontent-uce-c300="">Identity Management</li>
                <li _ngcontent-uce-c300="">Infrastructure Services</li>
                <li _ngcontent-uce-c300="">Networking</li>
                <li _ngcontent-uce-c300="">
                  Scripting and Dynamic Programming Languages
                </li>
                <li _ngcontent-uce-c300="">Security</li>
                <li _ngcontent-uce-c300="">
                  New systemd Behavior in RedHat Linux 8
                </li>
                <li _ngcontent-uce-c300="">Virtualization</li>
                <li _ngcontent-uce-c300="">Web Services</li>
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
