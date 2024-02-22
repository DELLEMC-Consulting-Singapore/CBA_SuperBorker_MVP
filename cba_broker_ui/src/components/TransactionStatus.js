import React, { useEffect, useState } from "react";
import {
  CloseSquareOutlined,
  InteractionOutlined,
  DownloadOutlined,
  WarningOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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
} from "antd";
import axios from "axios";
import Auth from "./Auth";
import moment from "moment";
// import React, { useState } from 'react';
// import { Radio, Space, Table, Tag, Tooltip } from 'antd';

function getRandomInt(min = 2000, max = 2999) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getRandomInt1(min = 100000, max = 999999) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortByKey(d) {
  return d.sort((a, b) => parseInt(b["key"]) - parseInt(a["key"]));
}

const TransactionStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [ariaStatusInfo, setAriaStatusInfo] = useState({});
  const [statusHistory, setStatusHistory] = useState([]);
  const [deploymentStatus, setDeploymentStatus] = useState("");
  const [revokeData, setRevokeData] = useState({});
  const [spinning, setSpinning] = useState(false);
  let [newData, setData] = useState([]);

  let getStatusByDeploymentId = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3002/api/deploy_status`)
        .then((res) => {
          resolve(res["data"]);
        })
        .catch((err) => reject(err));
    });
  };
  let getStatusByDeploymentStatusHistory = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3002/api/deploy_history_status`)
        .then((res) => {
          resolve(res["data"]);
        })
        .catch((err) => reject(err));
    });
  };

  let refreshData = async (r) => {
    setSpinning(true);
    let deployStatus = await getStatusByDeploymentId();
    r["deploy_status"] = deployStatus;
    if (deployStatus == "CREATE_FAILED") {
      r["request_status"] = "failed";
      r["request_status1"] = "failed";
    } else if (deployStatus["CREATE_SUCCESSFUL"]) {
      r["request_status"] = "completed";
      r["request_status1"] = "completed";
    }
    let deployHistory = await getStatusByDeploymentStatusHistory();
    r["deploy_status_history"] = deployHistory;
    let resourceType = [
      { resourceType: "Cloud.Puppet", error: 0, completed: 0, running: 0 },
      {
        resourceType: "Cloud.vSphere.Machine",
        error: 0,
        completed: 0,
        running: 0,
      },
      { resourceType: "Cloud.Network", error: 0, completed: 0, running: 0 },
      { resourceType: "Cloud.Volume", error: 0, completed: 0, running: 0 },
    ];
    let l = 0;
    deployHistory.map((history) => {
      resourceType.map((resource, index) => {
        if (history["resourceType"] != "") {
          if (history["resourceType"] == resource["resourceType"]) {
            if (history["name"] == "CREATE_FAILED") {
              resource["error"] = parseInt(resource["error"]) + 1;
            } else if (history["name"] == "CREATE_FINISHED") {
              resource["completed"] = parseInt(resource["completed"]) + 1;
            } else if (history["name"] == "CREATE_IN_PROGRESS") {
              resource["running"] = parseInt(resource["running"]) + 1;
            }
          }
        }
      });
    });
    let err = 0;
    let comp = 0;
    let run = 0;
    resourceType.map((resource) => {
      if (resource["resourceType"].includes("Puppet")) {
        if (resource["error"] > 0) {
          r["childrens"][1]["status"] = "Error";
        } else if (resource["completed"] > 0 && resource["error"] == 0) {
          r["childrens"][1]["status"] = "Completed";
        } else if (
          resource["running"] > 0 &&
          resource["completed"] == 0 &&
          resource["error"] == 0
        ) {
          r["childrens"][1]["status"] = "Running";
        }
      } else {
        if (resource["error"] > 0 && err == 0) {
          r["childrens"][0]["status"] = "Error";
          err++;
        } else if (
          resource["completed"] > 0 &&
          resource["error"] == 0 &&
          err == 0 &&
          comp == 0
        ) {
          r["childrens"][0]["status"] = "Completed";
          comp++;
        } else if (
          resource["running"] > 0 &&
          resource["completed"] == 0 &&
          resource["error"] == 0 &&
          err == 0 &&
          comp == 0 &&
          run == 0
        ) {
          r["childrens"][0]["status"] = "Running";
          run++;
        }
      }
    });
    r["created_by"] = deployStatus["createdBy"];
    await sendData(r);
    getNewTransaction();
    setSpinning(false);
  };

  function getNewTransaction() {
    let username = Auth.getUserProfile1();
    axios.get(`http://localhost:3002`).then((response) => {
      let responseData = sortByKey(response["data"]);
      let newdata = responseData.map((r) => {
        if (username == "puppetuser" || username == "puppet") {
          let puppet = r["childrens"].filter((c) => {
            if (c["tool_integration"] == "Puppet") {
              return c;
            }
          });
          r["childrens"] = [...puppet];
        }

        return r;
      });
      setData(sortByKey(newdata));
    });
  }
  useEffect(() => {
    getNewTransaction();
  }, []);

  const showModal = (type, historyData) => {
    setSpinning(true);
    setIsModalOpen(true);

    let statusInfo = historyData["deploy_status"];
    setAriaStatusInfo(statusInfo);

    let color = "geekblue"; //tag.length > 5 ? 'geekblue' : 'green';
    if (statusInfo["status"].includes("FAILED")) {
      color = "volcano";
    } else if (statusInfo["status"].includes("FINISHED")) {
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
          ariaHistory.push(allHistory.slice(ariaIndex, allHistory.length - 1));
        }
      }
    });
    if (type == "Puppet") {
      setStatusHistory(puppetHistory[puppetHistory.length - 1]);
    } else {
      setStatusHistory(ariaHistory[ariaHistory.length - 1]);
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
    handleRevoke(revokeData);
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
          if (d["status"] == "Running") {
            color = "processing";
          } else if (d["status"] == "Completed") {
            color = "success";
          }
          return <Badge status={color} text={d["status"]} />;
        },
      },
      {
        title: "No. of Retries",
        key: "no_of_retry",
        render: (d) => {
          if (d["no_of_retry"] != 0) {
            return d["no_of_retry"];
          }
        },
      },
      {
        title: "Retry",
        key: "Retry",
        render: (d) => {
          if (d["status"] == "Error") {
            return (
              <span style={{ fontSize: 25 }}>
                <InteractionOutlined
                  height={"1em"}
                  width={"1em"}
                  onClick={() => handleResume(d)}
                />
              </span>
            );
          }
        },
      },
      {
        title: "Rollback",
        key: "revoke",
        render: (d) => {
          if (d["status"] == "Error") {
            return (
              <span style={{ fontSize: 25 }}>
                <CloseSquareOutlined onClick={() => showModal1(d)} />
              </span>
            );
          }
        },
      },
      {
        title: "Log Details",
        key: "error_log",
        render: (d) => {
          return (
            <a>
              <span style={{ fontSize: 25 }}>
                <DownloadOutlined
                  onClick={() => showModal(d["tool_integration"], data)}
                />
              </span>
            </a>
          );
        },
      },
      {
        title: "Incident",
        key: "incident",
        render: (d) => {
          let color = `INC${getRandomInt1()}`; //tag.length > 5 ? 'geekblue' : 'green';
          if (d["status"] == "Running" || d["status"] == "Revoked") {
            color = "";
          } else if (d["status"] == "Completed") {
            color = "";
          }
          return color;
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data["childrens"]}
        pagination={false}
        bordered={true}
      />
    );
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date_time",
      key: "date_time",
    },
    {
      title: "Request Id",
      dataIndex: "request_id",
      key: "request_id",
      width: 100,
    },
    {
      title: "Transaction Id",
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: 280,
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
      width: 130,
    },
    {
      title: "Service Action",
      dataIndex: "service_action",
      key: "service_action",
      width: 130,
    },
    {
      title: "Payload",
      dataIndex: "payload",
      key: "payload",
      //ellipsis: true,
      ellipsis: {
        showTitle: false,
      },
      render: (payload) => (
        <Tooltip placement="topLeft" title={payload}>
          {payload}
        </Tooltip>
      ),
    },
    {
      title: "Status",
      key: "request_status",
      dataIndex: "request_status",
      render: (tag, data) => {
        let color = "volcano"; //tag.length > 5 ? 'geekblue' : 'green';
        if (tag == "running") {
          color = "geekblue";
        } else if (tag == "completed") {
          color = "green";
        }
        return (
          <span>
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
            <a>
              {tag != "completed" && (
                <ReloadOutlined
                  style={{ fontSize: "20px", color: "#fc0" }}
                  onClick={() => refreshData(data)}
                />
              )}
            </a>
          </span>
        );
      },
      width: 140,
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      width: 120,
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
    // axios
    // .post(`http://10.45.197.10:5000/api/transactions_post`, {
    await axios
      .put(`http://localhost:3002/`, {
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
          console.log(childerns);
          if (childerns["transaction_id"] == resumeData["transaction_id"]) {
            if (childerns["status"] == "Error") {
              if (childerns["key"] == resumeData["key"]) {
                newData[i]["childrens"][resumeData["key"]]["status"] =
                  "Running";
                newData[i]["childrens"][resumeData["key"]]["no_of_retry"] =
                  parseInt(
                    newData[i]["childrens"][resumeData["key"]]["no_of_retry"]
                  ) + 1;
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
      newData[index]["request_status"] = "running";
      newData[index]["request_status1"] = "running";
    }
    sendData(newData[index]);
  };

  let handleRevoke = (resumeData) => {
    let j = 0;
    let index = 0;
    if (resumeData["status"] == "Error") {
      newData.map((d) => {
        if (d["transaction_id"] == resumeData["transaction_id"]) {
          d["childrens"].map((childerns) => {
            //if (resumeData["status"] == "Error") {
            //childerns["status"] = "Revoked";
            newData[j]["childrens"][childerns["key"]]["status"] = "Revoked";
            newData[j]["request_status"] = "Revoked";
            newData[j]["request_status1"] = "Revoked";

            //}
          });
          index = j;
        }

        j++;
      });
      setData([...newData]);
    }
    sendData(newData[index]);
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
        size="10"
      />

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={1050}
      >
        {/* <Table dataSource={statusHistory} bordered={true} size="small" /> */}

        <div style={{ width: "40%" }}>
          <Table
            columns={showInfo}
            dataSource={[
              {
                key1: (
                  <span style={{ textAlign: "left" }}>
                    <b>Status</b>
                  </span>
                ),
                key2: (
                  <Tag color={deploymentStatus}>{ariaStatusInfo["status"]}</Tag>
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
            ]}
            showHeader={false}
            bordered={true}
            pagination={false}
          />
        </div>
        <br />
        <Table
          columns={columnStatusHistory}
          dataSource={statusHistory}
          bordered={true}
          size="small"
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
