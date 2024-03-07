import React, { useEffect, useState } from "react";
import {
  ExceptionOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  WarningOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { SERVICE_API } from "../config/config";
import {
  Badge,
  Dropdown,
  Space,
  Table,
  Tag,
  Tooltip,
  Modal,
  Typography,
  Divider,
  Spin,
  Button,
  Flex,
  Select,
  message,
} from "antd";
import axios from "axios";
import Auth from "./Auth";
import moment from "moment";

const TransactionStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [ariaStatusInfo, setAriaStatusInfo] = useState({});
  const [statusHistory, setStatusHistory] = useState([]);
  const [puppetStatusHistory, setPuppetStatusHistory] = useState([]);
  const [ariaStatusHistory, setAriaStatusHistory] = useState([]);
  const [deploymentStatus, setDeploymentStatus] = useState("");
  const [revokeData, setRevokeData] = useState({});
  const [retryData, setRetryData] = useState({});
  const [spinning, setSpinning] = useState(false);
  let [newData, setData] = useState([]);
  let [incidents, setIncidents] = useState([]);
  let [retries, setRetries] = useState(0);
  let [title, setTitle] = useState("Aria Automation Log Details");
  let [toolType, setToolType] = useState("all");
  const [messageApi, contextHolder] = message.useMessage();

  const errorRetries = (errorRetryMsg) => {
    messageApi.open({
      type: "error",
      content: `${errorRetryMsg}`,
    });
  };

  function getNewTransaction() {
    let username = Auth.getUserProfile1();
    //axios.get(`http://localhost:3002/`).then((response) => {
    axios.get(`${SERVICE_API}/transactions?username=${username}`).then((response) => {
      let responseData = response["data"];
      let newdata = responseData.map((r) => {
        r["deploy_status"] = JSON.parse(r["deploy_status"]);
        r["deploy_status_history"] = JSON.parse(r["deploy_status_history"]);
        r["childrens"] = JSON.parse(r["childrens"])
        return r;
      });
      setData(newdata);
    });
  }

  // useEffect(() => {

  //   getNewTransaction();
  // }, []);

  useEffect(() => {
    getNewTransaction();
    const interval = setInterval(() => {
      getNewTransaction();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const showModal = (type, historyData) => {
    setToolType(type);
    setSpinning(true);
    setIsModalOpen(true);

    let statusInfo =(historyData["deploy_status"]);
    
    statusInfo['createdBy'] = historyData['created_by']
    setAriaStatusInfo(statusInfo);

    let color = "geekblue"; //tag.length > 5 ? 'geekblue' : 'green';
    if (statusInfo["status"].includes("FAILED")) {
      color = "volcano";
    } else if (statusInfo["status"].includes("SUCCESSFUL")) {
      color = "green";
    }

    setDeploymentStatus(color);

    let allHistory = (historyData["deploy_status_history"]);
    console.log(historyData["childrens"])

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
          if (ariaIndex == 0) {
            ariaIndex++;
          } else {
            ariaHistory.push(
              allHistory.slice(ariaIndex, allHistory.length - 1)
            );
          }
        }
      }
    });
    console.log(type);
    if (type == "all") {
      if (ariaIndex == 1) {
        setAriaStatusHistory(allHistory);
      } else {
        setAriaStatusHistory(ariaHistory[ariaHistory.length - 1]);
      }
      if (puppetHistory.length)
        setPuppetStatusHistory(puppetHistory[puppetHistory.length - 1]);
      else {
        setPuppetStatusHistory([]);
      }
      setStatusHistory([]);
    } else if (type == "Puppet") {
      if (puppetHistory.length)
        setStatusHistory(puppetHistory[puppetHistory.length - 1]);
      else {
        setStatusHistory([]);
      }
      setPuppetStatusHistory([]);
      setAriaStatusHistory([]);
      setRetryData(historyData["childrens"][1]);
    } else {
      if (ariaIndex == 1) {
        setStatusHistory(allHistory);
      } else {
        setStatusHistory(ariaHistory[ariaHistory.length - 1]);
      }
      setPuppetStatusHistory([]);
      setAriaStatusHistory([]);
      setRetryData(historyData["childrens"][0]);
    }

    if (type == "Puppet") {
      setTitle("Puppet Log Details");
    }
    //incidents
    if (type == "all") {
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
        noOfRtries += Number(c["no_of_retry"]);
      });

      setIncidents(incidentData);

      setRetries(noOfRtries);
    } else if (type == "Puppet") {
      let incidentData = [];
      let noOfRtries = 0;
      historyData["childrens"].map((c) => {
        if (c["tool_integration"] == "Puppet") {
          if (c["status"] == "Failed") {
            incidentData.push({
              incident: c["incident"],
              status: "Inprogress",
              comments: `We are acknowledging the error, checking the ${c["tool_integration"]} integration with OSB.`,
            });
          }
          noOfRtries += Number(c["no_of_retry"]);
        }
      });

      setIncidents(incidentData);
      setRetries(noOfRtries);
    } else {
      let incidentData = [];
      let noOfRtries = 0;
      historyData["childrens"].map((c) => {
        if (c["tool_integration"] == "Aria Automation") {
          if (c["status"] == "Failed") {
            incidentData.push({
              incident: c["incident"],
              status: "Inprogress",
              comments: `We are acknowledging the error, checking the ${c["tool_integration"]} integration with OSB.`,
            });
          }
          noOfRtries += Number(c["no_of_retry"]);
        }
      });

      setIncidents(incidentData);
      setRetries(noOfRtries);
    }

    setSpinning(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal1 = (revokeData) => {
    setRevokeData(revokeData);
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    handleRevoke(retryData);
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const expandedRowRender1 = (data) => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Tool Integration",
        dataIndex: "tool_integration",
        key: "tool_integration",
      },
      {
        title: "Status",
        key: "status",
        render: (d) => {
          let color = "error"; //tag.length > 5 ? 'geekblue' : 'green';
          let status = d["status"];
          if (d["status"] == "Running") {
            color = "processing";
            status = d["status"];
          } else if (d["status"] == "Completed") {
            color = "success";
            status = d["status"];
          }
          if (d["status"] == "Rollback") {
            color = "geekblue";
            status = "Rollback Successful";
          }

          return (
            <a>
              <Tag
                color={color}
                key={status}
                onClick={() => showModal(d["tool_integration"], data)}
              >
                {status.toUpperCase()}
              </Tag>
            </a>
          );
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data["childrens"]}
        pagination={false}
        bordered={true}
        size="small"
      />
    );
  };

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

        if (tag == "Rollback") {
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
            {/* <a>
              {tag != "completed" && (
                <ReloadOutlined
                  style={{ fontSize: "20px", color: "#fc0" }}
                  onClick={() => refreshData(data)}
                />
              )}
            </a> */}
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
  let parentData = [];
  parentData["service_name"] = "DevBox";

  // useEffect(() => {
  //   let username = Auth.getUserProfile1();
  //   //axios.get(`http://10.45.197.10:5000/api/transactions`).then((response) => {
  //   axios.get(`http://localhost:3002`).then((response) => {
  //     let responseData = sortByKey(response["data"]);
  //     let newdata = responseData.map((r) => {
  //       if (username == "puppetuser" || username == "puppet") {
  //         let puppet = r["childrens"].filter((c) => {
  //           if (c["tool_integration"] == "Puppet") {
  //             return c;
  //           }
  //         });
  //         r["childrens"] = [...puppet];
  //       }

  //       return r;
  //     });
  //     setData(sortByKey(newdata));
  //   });
  // }, []);

  async function sendData(transactions) {
    let sendData = JSON.stringify(transactions);
    await axios
      .post(`${SERVICE_API}/transactions_post`, {
        data: sendData,
      })
      .then((response) => {})
      .catch((error) => {});
  }
  let handleResume = (resumeData) => {
    let i = 0;
    let no_of_error = 0;
    let index = 0;
    newData.map((d) => {
      if (d["childrens"] !== undefined && d["childrens"].length > 0) {
        d["childrens"].map((childerns) => {
          if (childerns["transaction_id"] == resumeData["transaction_id"]) {
            if (childerns["status"] == "Failed") {
              if (childerns["key"] == resumeData["key"]) {
                newData[i]["childrens"][resumeData["key"]]["status"] =
                  "Running";
                newData[i]["childrens"][resumeData["key"]]["no_of_retry"] =
                  parseInt(
                    newData[i]["childrens"][resumeData["key"]]["no_of_retry"]
                  ) + retries;
                setData([...newData]);
                index = i;
              }
              no_of_error += 1;
            }
          }
        });
      }
      i++;
    });
    if (no_of_error == 1) {
      newData[index]["running_status"] = "running";
      newData[index]["running_status1"] = "running";
    }
    console.log(newData[index]);
    sendData(newData[index]);
    handleCancel();
  };

  let handleRevoke = (resumeData) => {
    let j = 0;
    let index = 0;
    if (resumeData["status"] == "Failed") {
      newData.map((d) => {
        if (d["transaction_id"] == resumeData["transaction_id"]) {
          d["childrens"].map((childerns) => {
            //if (resumeData["status"] == "Error") {
            //childerns["status"] = "Revoked";
            newData[j]["childrens"][childerns["key"]]["status"] = "Rollback";
            newData[j]["running_status"] = "Rollback";
            newData[j]["running_status1"] = "Rollback";

            //}
          });
          index = j;
        }

        j++;
      });
      setData([...newData]);
    }
    sendData(newData[index]);
    handleCancel();
  };

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

  const retryOptions = [
    { name: 1, id: 1 },
    { name: 2, id: 2 },
    { name: 3, id: 3 },
    { name: 4, id: 4 },
    { name: 5, id: 5 },
    { name: 6, id: 6 },
    { name: 7, id: 7 },
    { name: 8, id: 8 },
    { name: 9, id: 9 },
    { name: 10, id: 10 },
  ];

  let handleChangeRetry = (e) => {
    setRetries(e);
  };
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (render) => {
            return expandedRowRender1(render);
          },
          defaultExpandedRowKeys: [],
        }}
        dataSource={newData}
        bordered={true}
        rowKey="id"
      />

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Retry"
        centered
        width={1050}
        footer={() => {
          if (statusHistory.length == 0 || retryData["status"] != "Failed") {
            return (
              <>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" onClick={handleOk}>
                  Ok
                </Button>
              </>
            );
          } else if (retryData["status"] == "Failed") {
            return (
              <>
                {contextHolder}
                <Button onClick={handleCancel}>Cancel</Button>
                &nbsp;
                <Select value={0} onChange={handleChangeRetry} style={{width:175}}>
                <Select.Option value={0}>Select No. of Retries</Select.Option>
                  {retryOptions.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                &nbsp;

                <Button
                  type="primary"
                  onClick={() => {
                    if (retries == 0) {
                      errorRetries("Please select no. of retries");
                    } else {
                      handleResume(retryData);
                    }
                  }}
                  danger
                >
                  Retry
                </Button>
                <Button type="primary" onClick={() => showModal1(retryData)}>
                  Rollback
                </Button>
              </>
            );
          }
        }}
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
          title={() => <b>{title}</b>}
          columns={columnStatusHistory}
          dataSource={statusHistory}
          bordered={true}
          size="small"
          style={{
            display:
              toolType == "Aria Automation" || toolType == "Puppet"
                ? "block"
                : "none",
          }}
        />
        <br />

        <Table
          title={() => <b>{"Aria Automation Log Details"}</b>}
          columns={columnStatusHistory}
          dataSource={ariaStatusHistory}
          bordered={true}
          size="small"
          style={{
            display: toolType == "all" ? "block" : "none",
          }}
        />
        <br />
        <Table
          title={() => <b>{"Puppet Log Details"}</b>}
          columns={columnStatusHistory}
          dataSource={puppetStatusHistory}
          bordered={true}
          size="small"
          style={{
            display: toolType == "all" ? "block" : "none",
          }}
        />
      </Modal>

      <Modal
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        centered
      >
        <span>
          <span></span>

          <p>
            <WarningOutlined style={{ fontSize: "20px", color: "#faad14" }} />
            <br />
            {"    "}
            Clicking on the "Rollback" action will permanently rollback all the
            tasks (sub-tasks) of the requests including the ones that are
            completed successfully. Do you wish to proceed further?
          </p>
        </span>
      </Modal>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};
export default TransactionStatus;
