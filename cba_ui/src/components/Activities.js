import React, { useState, useEffect } from "react";
import { Modal, Spin, Row, Table, Tag, Tooltip, Alert, Col } from "antd";
import axios from "axios";
import moment from "moment";
import Auth from "./Auth";
import { SERVICE_API } from "../config/config";

const Activities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ariaStatusInfo, setAriaStatusInfo] = useState({});
  const [statusHistory, setStatusHistory] = useState([]);
  const [puppetStatusHistory, setPuppetStatusHistory] = useState([]);
  const [ariaStatusHistory, setAriaStatusHistory] = useState([]);

  const [deploymentStatus, setDeploymentStatus] = useState("geekblue");
  const [retryData, setRetryData] = useState({});
  const [spinning, setSpinning] = useState(false);
  let [newData, setData] = useState([]);
  let [incidents, setIncidents] = useState([]);
  let [retries, setRetries] = useState(0);

  /***
   * Get transactions by end user
   */
  function getNewTransaction() {
    let username = Auth.getUserProfile1();
    axios.get(`${SERVICE_API}/transactions?username=${username}`).then((response) => {
      let responseData = response["data"];
      let result = responseData.map((r) => {
        r["deploy_status"] = JSON.parse(r["deploy_status"]);
        r["deploy_status_history"] = JSON.parse(r["deploy_status_history"]);
        r["childrens"] = JSON.parse(r["childrens"])
        return r;
      });
      setData(result);
    }).catch(e => setData([]));
  }

  
  /***
   * Auto trigger getTransaction function every 1 minute
   */
  useEffect(() => {
    getNewTransaction();
    const interval = setInterval(() => {
      getNewTransaction();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

   /***
   * ShowModal: 
   * When user clicks on transaction status display particular transaction info on pop-up.
   * Status Info
   * Incident Info
   * Aria automation status history
   * Puppet status history
   */
  const showModal = (type, historyData) => {
    setSpinning(true);
    setIsModalOpen(true);

    let statusInfo = historyData["deploy_status"];
    if(Object.keys(statusInfo).length > 0){
      //if (statusInfo !== undefined)
      {
        statusInfo['createdBy'] = historyData['created_by']
        setAriaStatusInfo(statusInfo);

        let color = "geekblue"; //tag.length > 5 ? 'geekblue' : 'green';
        if (statusInfo["status"].includes("FAILED")) {
          color = "volcano";
        } else if (statusInfo["status"].includes("SUCCESSFUL")) {
          color = "green";
        }

        setDeploymentStatus(color);

        let allHistory = historyData["deploy_status_history"];

        let puppetHistory = [];
        let ariaHistory = [];
        let findPuppet = 0;

        let ariaIndex = 0;
        allHistory.map((history) => {
          findPuppet++;
          if (history["resourceType"] !== undefined) {
            if (history["resourceType"].includes("Puppet")) {
              puppetHistory.push(allHistory.slice(0, findPuppet));
              ariaIndex = findPuppet;
            } else {
              ariaHistory.push(
                allHistory.slice(ariaIndex, allHistory.length - 1)
              );
            }
          }
        });

        if (type == "all") {
          if (ariaHistory.length)
            setAriaStatusHistory(ariaHistory[ariaHistory.length - 1]);
          if (puppetHistory.length)
            setPuppetStatusHistory(puppetHistory[puppetHistory.length - 1]);
          setStatusHistory([]);
        }
        historyData["childrens"] = historyData["childrens"]
        //incidents
        let incidentData = [];
        let noOfRtries = 0;
        historyData["childrens"].map((c) => {
          if (c["status"] == "Failed") {
            incidentData.push({
              incident: c["incident"],
              status: "Inprogress",
              comments: `We are acknowledging the error, checking the ${c["tool_integration"]} integration with OSB.`,
            });
          }
          console.log("RETRIES", c["no_of_retry"]);
          noOfRtries += Number(c["no_of_retry"]);
        });
        setIncidents(incidentData);
        setRetries(noOfRtries);
        // if (type == "all") {
        //   setAriaStatusHistory(ariaHistory[ariaHistory.length - 1]);
        //   setPuppetStatusHistory(puppetHistory[puppetHistory.length - 1]);
        // }
      }
    }else{
      setAriaStatusInfo({});
      setDeploymentStatus("geekblue");
      setAriaStatusHistory([])
      setPuppetStatusHistory([])
      setStatusHistory([]);
      setRetryData({})
      setIncidents([])
    }
    

    setSpinning(false);
  };

   /***
   * Close the transaction info pop-up
   */
  const handleOk = () => {
    setIsModalOpen(false);
  };

   /***
   * Close the transaction info pop-up
   */
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  /***
   * Columns for Transaction history table
   */
  const columns = [
    {
      title: "Date",
      dataIndex: "date_time",
      key: "date_time",
      width: 120,
      render: (d) => {
        return moment(d).format("MM-DD-YYYY HH:mm");
      }
    },
    {
      title: "Request Id",
      dataIndex: "request_id",
      key: "request_id",
      width: 70,
    },
    {
      title: "Transaction Id",
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: 200,
      render: (transactionId, data) => (
        <Tooltip placement="topLeft" title={data["payload"]}>
          {transactionId}
        </Tooltip>
      ),
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
      width: 100,
    },
    {
      title: "Service Action",
      dataIndex: "service_action",
      key: "service_action",
      width: 100,
    },
    {
      title: "Status",
      key: "running_status",
      dataIndex: "running_status",
      render: (tag, data) => {
        let color = "volcano"; //tag.length > 5 ? 'geekblue' : 'green';
        if (tag == "running") {
          color = "geekblue";
        } else if (tag == "completed") {
          color = "green";
        }

        if (tag == "rollback") {
          color = "geekblue";
          tag = "Rollback Successful";
        }

        return (
          <span>
            <a>
              <Tag
                color={color}
                key={tag}
                onClick={() => showModal("all", data)}
              >
                {tag.toUpperCase()}
              </Tag>
            </a>
          </span>
        );
      },
      width: 170,
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      width: 100,
    },
    //   {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //       <Space size="middle">
    //         <a> {record.name}</a>
    //         <a>Delete</a>
    //       </Space>
    //     ),
    //   },
  ];
  /***
   * Columns for status history of aria automation and puppet 
   */
  const columnStatusHistory = [
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (d) => {
        return moment(d).format("MM-DD-YYYY HH:mm");
      },
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "name",
      key: "name",
      render: (tag) => {
        let color = "geekblue"; //tag.length > 5 ? 'geekblue' : 'green';
        if (tag.includes("FAILED")) {
          color = "volcano";
        } else if (tag.includes("FINISHED")) {
          color = "green";
        }
        return (
          <span>
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Resource Name",
      dataIndex: "resourceName",
      key: "resourceName",
    },
    {
      title: "Resource Type",
      dataIndex: "resourceType",
      key: "resourceType",
    },
  ];

  const incidentHistory = [
    {
      title: "Incident Id",
      dataIndex: "incident",
      key: "incident",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
  ];

  /**
   * Table two column structure definition 
   * Display info of 
   * 1. Deployment status
   * 2. RequestId
   * 3. CreatedBy
   * 4. CreatedAt
   * 5. No. of Retries
   * 
   */
  let showInfo = [
    {
      title: "Date",
      dataIndex: "key1",
      key: "key1",
    },
    {
      title: "Date",
      dataIndex: "key2",
      key: "key2",
    },
  ];

  return (
    <>
   
      <Row style={{float:"right"}}>
          <Alert
            message="Page refreshes every 1 minute"
            type="info"
            style={{ fontSize: 10 }}
            showIcon
            banner
          /> 
        </Row> 
      <Table style={{marginTop:40}} columns={columns} dataSource={newData} bordered={true} size="10" />

      <Modal
      destroyOnClose={true}
      afterClose={()=>setSpinning(false)}
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ok"
        centered
        width={1050}
      >
        {/* <Table dataSource={statusHistory} bordered={true} size="small" /> */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Table
              style={{ width: "99%" }}
              columns={showInfo}
              dataSource={[
                {
                  key1: (
                    <span style={{ textAlign: "left" }}>
                      <b>Status</b>
                    </span>
                  ),
                  key2: (
                    <Tag color={deploymentStatus}>
                      {ariaStatusInfo["status"]}
                    </Tag>
                  ),
                },
                { key1: "Request ID", key2: <a>{ariaStatusInfo["id"]}</a> },
                { key1: "Created By", key2: ariaStatusInfo["createdBy"] },
                {
                  key1: "Created At",
                  key2: moment(ariaStatusInfo["createdAt"]).format(
                    "MM-DD-YYYY HH:mm"
                  ),
                },
                {
                  key1: "No. of Retries",
                  key2: (
                    <Tag
                      color="#A0522D"
                      style={{ width: 40, textAlign: "center" }}
                    >
                      {retries}
                    </Tag>
                  ),
                },
              ]}
              showHeader={false}
              bordered={true}
              pagination={false}
              size="small"
            />
          </div>
          <div style={{ width: "50%" }}>
            {
              <Table
                columns={incidentHistory}
                dataSource={incidents}
                showHeader={true}
                bordered={true}
                pagination={false}
                size="small"
              />
            }
          </div>
        </div>
        <br />

        <Table
          title={() => <b>{"Aria Automation Log Details"}</b>}
          columns={columnStatusHistory}
          dataSource={ariaStatusHistory}
          bordered={true}
          size="small"
          style={
            {
              // display: ariaStatusHistory.length > 0 ? "block" : "none",
            }
          }
        />
        <br />
        <Table
          title={() => <b>{"Puppet Log Details"}</b>}
          columns={columnStatusHistory}
          dataSource={puppetStatusHistory}
          bordered={true}
          size="small"
          style={
            {
              // display: puppetStatusHistory.length > 0 ? "block" : "none",
            }
          }
        />
      </Modal>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};
export default Activities;