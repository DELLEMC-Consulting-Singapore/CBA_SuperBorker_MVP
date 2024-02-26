import React, { useState, useEffect } from "react";
import { Modal, Spin, Space, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import Auth from "./components/Auth";
function sortByKey(d) {
  return d.sort((a, b) => parseInt(b["key"]) - parseInt(a["key"]));
}

const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];
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

  let getStatusByDeploymentId = (deployment_id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://10.45.197.10:5000/api/deploy_status?deploymentId=${deployment_id}`
        )
        .then((res) => {
          resolve(res["data"]);
        })
        .catch((err) => reject(err));
    });
  };
  let getStatusByDeploymentStatusHistory = (deployment_id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://10.45.197.10:5000/api/deploy_history_status?deploymentId=${deployment_id}`
        )
        .then((res) => {
          resolve(res["data"]);
        })
        .catch((err) => reject(err));
    });
  };

  let refreshData = async (r) => {
    setSpinning(true);
    if (r["request_status"] == "running") {
      let deployStatus = await getStatusByDeploymentId(r["deployment_id"]);
      r["deploy_status"] = deployStatus;
      if (deployStatus["status"] == "CREATE_FAILED") {
        r["request_status"] = "failed";
        r["request_status1"] = "failed";
      } else if (deployStatus["status"] == "CREATE_SUCCESSFUL") {
        r["request_status"] = "completed";
        r["request_status1"] = "completed";
      }
      let deployHistory = await getStatusByDeploymentStatusHistory(
        r["deployment_id"]
      );
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
      console.log(resourceType);
      let err = 0;
      let comp = 0;
      let run = 0;
      resourceType.map((resource) => {
        if (resource["resourceType"].includes("Puppet")) {
          if (resource["error"] > 0) {
            r["childrens"][1]["status"] = "Failed";
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
            r["childrens"][0]["status"] = "Failed";
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
      if (
        resourceType[0]["error"] == 0 &&
        resourceType[0]["completed"] == 0 &&
        resourceType[0]["running"] == 0
      )
        r["childrens"][0]["status"] = "Running";

      r["created_by"] = deployStatus["createdBy"];
      await sendData(r);

      let j;
      newData.map((existingData) => {
        if (existingData["transaction_id"] == r["transaction_id"]) {
          newData[j] = r;
        }
        j++;
      });

      setData([...newData]);
    }

    //getNewTransaction();
    setSpinning(false);
  };

  async function sendData(transactions) {
    let sendData = JSON.stringify(transactions);
    await axios
      .post(`http://10.45.197.10:5000/api/transactions_post`, {
        data: sendData,
      })
      .then((response) => {})
      .catch((error) => {});
  }

  function getNewTransaction() {
    let username = Auth.getUserProfile1();
    //axios.get(`http://localhost:3002/`).then((response) => {
    axios.get(`http://10.45.197.10:5000/api/transactions`).then((response) => {
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

  const showModal = (type, historyData) => {
    setSpinning(true);
    setIsModalOpen(true);

    let statusInfo = historyData["deploy_status"];
    //if (statusInfo !== undefined)
    {
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

    setSpinning(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date_time",
      key: "date_time",
      width: 120,
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
      key: "request_status",
      dataIndex: "request_status",
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

  useEffect(() => {
    getNewTransaction();
    const interval = setInterval(() => {
      getNewTransaction();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
      <Table columns={columns} dataSource={newData} bordered={true} size="10" />

      <Modal
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
