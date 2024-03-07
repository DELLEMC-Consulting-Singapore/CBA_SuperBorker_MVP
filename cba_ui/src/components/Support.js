import React from "react";
import { Card, Row, Col } from "antd";

export const Support = () => {
  return (
    <>
      <p>
        This section provides a different way of connecting with the Product
        Team for any queries related to service offering or for any
        instance-related support.
      </p>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <Card hoverable style={{ width: 250, justifyContent: "center" }}>
            <div>
              <div className="icon-wrapper">
                <i class="dds__icon dds__icon--doc-support dds__icon--color"></i>
              </div>
            </div>

            <div class="dds__card__content dds__d-block dds__p-0">
              <div class="dds__card__header dds__mt-3">
                <h5 class=" dds__font-weight-normal-support"> Support DL </h5>
              </div>
              <div class="dds__card__body-support dds__d-block dds__p-0">
                <p class="dds__font-size-small dds__mb-3">
                  For any questions regarding the Service, contact the Service
                  support team through an email.
                </p>
              </div>
            </div>
            {/* <Paragraph
              style={{
                "font-weight": "630",
                "font-size": "25px",
                margin: "0",
              }}
            >
              Cache
            </Paragraph> */}

            {/* <Paragraph>
                In computing, a cache is a high-speed data storage layer which stores a subset ...
              </Paragraph> */}
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card hoverable style={{ width: 250, justifyContent: "center" }}>
            <div>
              <div className="icon-wrapper">
                <i class="dds__icon dds__icon--assistance dds__icon--color"></i>
              </div>
            </div>

            <div class="dds__card__content dds__d-block dds__p-0">
              <div class="dds__card__header dds__mt-3">
                <h5 class=" dds__font-weight-normal-support">
                  Open Support Incident
                </h5>
              </div>
              <div class="dds__card__body-support dds__d-block dds__p-0">
                <p class="dds__font-size-small dds__mb-3">
                  For any questions regarding the Service, contact the Service
                  support team through an email.
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card hoverable style={{ width: 250, justifyContent: "center" }}>
            <div>
              <div className="icon-wrapper">
                <i class="dds__icon dds__icon--device-monitor dds__icon--color"></i>
              </div>
            </div>

            <div class="dds__card__content dds__d-block dds__p-0">
              <div class="dds__card__header dds__mt-3">
                <h5 class=" dds__font-weight-normal-support">
                  Microsoft Teams
                </h5>
              </div>
              <div class="dds__card__body-support dds__d-block dds__p-0">
                <p class="dds__font-size-small dds__mb-3">
                  For any questions regarding the Service, contact the Service
                  support team through an email.
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card hoverable style={{ width: 250, justifyContent: "center" }}>
            <div>
              <div className="icon-wrapper">
                <i class="dds__icon dds__icon--comment dds__icon--color"></i>
              </div>
            </div>

            <div class="dds__card__content dds__d-block dds__p-0">
              <div class="dds__card__header dds__mt-3">
                <h5 class=" dds__font-weight-normal-support">Chat Bot</h5>
              </div>
              <div class="dds__card__body-support dds__d-block dds__p-0">
                <p class="dds__font-size-small dds__mb-3">
                  For any questions regarding the Service, contact the Service
                  support team through an email.
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{ marginTop: 15 }}
      >
        <Col className="gutter-row" span={6}>
          <Card hoverable style={{ width: 250, justifyContent: "center" }}>
            <div>
              <div className="icon-wrapper">
                <i class="dds__icon dds__icon--doc-manual dds__icon--color"></i>
              </div>
            </div>

            <div class="dds__card__content dds__d-block dds__p-0">
              <div class="dds__card__header dds__mt-3">
                <h5 class=" dds__font-weight-normal-support">User Manual</h5>
              </div>
              <div class="dds__card__body-support dds__d-block dds__p-0">
                <p class="dds__font-size-small dds__mb-3">
                  For any questions regarding the Service, contact the Service
                  support team through an email.
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
