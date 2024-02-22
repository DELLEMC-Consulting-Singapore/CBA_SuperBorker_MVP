import React, { useEffect, useState } from "react";
import {
  CloseSquareOutlined,
  InteractionOutlined,
  DownloadOutlined,
  WarningOutlined,
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
  const showModal = (type) => {
    setSpinning(true);
    setIsModalOpen(true);

    let statusInfo = {
      id: "377609b1-f166-4206-a30c-b83de2be541c",
      name: "deployment_377609b1-f166-4206-a30c-b83de2be541c",
      orgId: "69bb0283-5024-409b-a1df-829a911cf6b0",
      catalogItemId: "4c31e0fc-02f9-354d-b4c7-088ea2d0bfad",
      catalogItemVersion: "24",
      blueprintId: "6bb0b94f-ba27-4925-847f-22b9162da013",
      blueprintVersion: "24",
      iconId: "13a3d6b7-5185-3995-820f-4968f18daa69",
      createdAt: "2024-02-21T13:59:36.030331Z",
      createdBy: "gutturra",
      ownedBy: "gutturra",
      ownerType: "USER",
      lastUpdatedAt: "2024-02-21T14:59:42.220618Z",
      lastUpdatedBy: "gutturra",
      leaseExpireAt: "2024-02-28T14:59:00Z",
      leaseGracePeriodDays: 5,
      inputs: {
        pod: "pod3",
        vCPU: 4,
        ramGb: 4,
        vmEnv: "Development",
        cpuGen: "a",
        osRole: "MSWSTD",
        vmType: "General",
        disk1Letter: "E",
        disk1SizeGB: 1,
        disk2Letter: "F",
        disk2SizeGB: 1,
        disk3Letter: "G",
        disk3SizeGB: 1,
        disk4Letter: "H",
        disk4SizeGB: 1,
        disk5Letter: "I",
        disk5SizeGB: 1,
        iisInstalled: false,
        adEnvironment: "Prod (au.cbainet.com)",
        extraDiskCount: 1,
        extraDiskFormat: "NTFS",
        availabilityZone: "Norwest",
        networkSecurityZone: "Internally Controlled",
        workspace_environment: "NonProduction",
      },
      projectId: "0d5d4d40-53f6-44df-963a-3593955dbd0c",
      resources: [
        {
          id: "cad020ea-56fe-40be-9e15-5469c9140ae4",
          name: "Cloud_Network_1",
          type: "Cloud.Network",
          properties: {
            resourceName: "TD-INTCTR-10.36.33.0_26-VPDD",
          },
          createdAt: "2024-02-21T13:59:53.368304Z",
          syncStatus: "SUCCESS",
          origin: "DEPLOYED",
          state: "OK",
        },
        {
          id: "c7bf1293-da67-41dd-9cbc-cd42d0d0e1af",
          name: "Additional_Disk_1_Disk[0]",
          type: "Cloud.Volume",
          properties: {
            resourceName: "Additional_Disk_1_Disk[0]-mcm26275-256917577401",
          },
          createdAt: "2024-02-21T13:59:47.353256Z",
          syncStatus: "SUCCESS",
          origin: "DEPLOYED",
          state: "OK",
        },
        {
          id: "bb8f6e37-c938-4cab-9af6-bb7be167671e",
          name: "Cloud_vSphere_Machine_1",
          type: "Cloud.vSphere.Machine",
          properties: {
            address: "10.36.33.42",
            powerState: "ON",
            resourceName: "vnw30001214",
          },
          createdAt: "2024-02-21T14:00:06.886528Z",
          syncStatus: "SUCCESS",
          origin: "DEPLOYED",
          dependsOn: ["Additional_Disk_1_Disk[0]", "Cloud_Network_1"],
          state: "OK",
        },
      ],
      status: "CREATE_FAILED",
    };
    setAriaStatusInfo(statusInfo);

    let color = "geekblue"; //tag.length > 5 ? 'geekblue' : 'green';
    if (statusInfo["status"].includes("FAILED")) {
      color = "volcano";
    } else if (statusInfo["status"].includes("FINISHED")) {
      color = "green";
    }

    setDeploymentStatus(color);

    let allHistory = [
      {
        id: "6c36d374-31c0-4651-b439-b0d6d94e2802",
        name: "REQUEST_FAILED",
        details: "create Puppet node timeout after '20' minutes.",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T14:59:42.195211Z",
        userEvent: false,
      },
      {
        id: "4fddfd17-4c2d-4a90-a0c9-b28499a25374",
        name: "COMPLETION_FINISHED",
        details: "",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T14:59:42.123519Z",
        userEvent: false,
      },
      {
        id: "a5184568-d40a-422f-b9e3-6802083b9bf3",
        name: "COMPLETION_IN_PROGRESS",
        details: "",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T14:59:39.952651Z",
        userEvent: false,
      },
      {
        id: "5fa15249-46b5-4b35-828b-1265cf750932",
        name: "CREATE_FAILED",
        details: "create Puppet node timeout after '20' minutes.",
        resourceName: "Cloud_Puppet_1",
        resourceType: "Cloud.Puppet",
        timestamp: "2024-02-21T14:59:39.257530Z",
        userEvent: false,
      },
      {
        id: "e88f1694-af5a-4f4e-bb7d-949afbfd59b6",
        name: "CREATE_IN_PROGRESS",
        details: "",
        resourceName: "Cloud_Puppet_1",
        resourceType: "Cloud.Puppet",
        timestamp: "2024-02-21T14:25:21.597525Z",
        userEvent: false,
      },
      {
        id: "0dc34ff4-017d-46f6-8960-fced3db87d54",
        name: "CREATE_FINISHED",
        details:
          "Cloud Resource Name: vnw30001214\n More Details: https://vmpautomation-dev.stg.nonprod.vmware.cba/automation-ui/#/provisioning-ui;ash=%2Frequests%2F606386de-3cfe-4ab7-8837-d8e62912b5a5",
        resourceName: "Cloud_vSphere_Machine_1",
        resourceType: "Cloud.vSphere.Machine",
        timestamp: "2024-02-21T14:25:20.008743Z",
        userEvent: false,
      },
      {
        id: "407ca08e-f770-4a58-b009-9eb413fe714e",
        name: "CREATE_IN_PROGRESS",
        details:
          "Request is in stage STARTED and substage PROVISIONING More Details: https://vmpautomation-dev.stg.nonprod.vmware.cba/automation-ui/#/provisioning-ui;ash=%2Frequests%2F606386de-3cfe-4ab7-8837-d8e62912b5a5",
        resourceName: "Cloud_vSphere_Machine_1",
        resourceType: "Cloud.vSphere.Machine",
        timestamp: "2024-02-21T14:02:25.690875Z",
        userEvent: false,
      },
      {
        id: "56732f46-eddd-42cc-b6e7-c58d2c339c92",
        name: "CREATE_IN_PROGRESS",
        details: "",
        resourceName: "Cloud_vSphere_Machine_1",
        resourceType: "Cloud.vSphere.Machine",
        timestamp: "2024-02-21T14:00:25.545447Z",
        userEvent: false,
      },
      {
        id: "a8d8199e-1252-4563-8ca2-363e18bf3d69",
        name: "CREATE_FINISHED",
        details:
          "Cloud Resource Name: TD-INTCTR-10.36.33.0_26-VPDD\n More Details: https://vmpautomation-dev.stg.nonprod.vmware.cba/automation-ui/#/provisioning-ui;ash=%2Frequests%2F3cf10c0c-0b80-496f-9506-c0d30a649af3",
        resourceName: "Cloud_Network_1",
        resourceType: "Cloud.Network",
        timestamp: "2024-02-21T14:00:22.425703Z",
        userEvent: false,
      },
      {
        id: "bb40ad67-39f1-4853-a595-3386059d3a50",
        name: "CREATE_FINISHED",
        details:
          "Cloud Resource Name: Additional_Disk_1_Disk[0]-mcm26275-256917577401",
        resourceName: "Additional_Disk_1_Disk[0]",
        resourceType: "Cloud.Volume",
        timestamp: "2024-02-21T14:00:12.835188Z",
        userEvent: false,
      },
      {
        id: "7ba2fea1-15c7-4d5c-a866-2c4ce8d06b44",
        name: "CREATE_IN_PROGRESS",
        details: "",
        resourceName: "Additional_Disk_1_Disk[0]",
        resourceType: "Cloud.Volume",
        timestamp: "2024-02-21T14:00:12.748988Z",
        userEvent: false,
      },
      {
        id: "4dcfe044-ffb9-4c7b-9345-94f95db42c8a",
        name: "CREATE_IN_PROGRESS",
        details: "",
        resourceName: "Cloud_Network_1",
        resourceType: "Cloud.Network",
        timestamp: "2024-02-21T14:00:12.744395Z",
        userEvent: false,
      },
      {
        id: "320f89ef-acf6-4f40-b7fa-0e8aea31d4ca",
        name: "APPROVAL_FINISHED",
        details:
          "No Approval Required - Applicable approval policies are empty in the org or project",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T14:00:10.604769Z",
        userEvent: true,
      },
      {
        id: "a80ab244-4dd6-4696-958b-6135a5013e2e",
        name: "APPROVAL_IN_PROGRESS",
        details: "Checking for any approval policies",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T14:00:07.419366Z",
        userEvent: true,
      },
      {
        id: "e180991d-3697-4b1e-8324-aa1dbc15f37d",
        name: "ALLOCATE_FINISHED",
        details:
          " More Details: https://vmpautomation-dev.stg.nonprod.vmware.cba/automation-ui/#/provisioning-ui;ash=%2Frequests%2Fe288cfd0-9ef6-4841-9d84-1bb825077a00",
        resourceName: "Cloud_vSphere_Machine_1",
        resourceType: "Cloud.vSphere.Machine",
        timestamp: "2024-02-21T14:00:06.914930Z",
        userEvent: false,
      },
      {
        id: "a161971c-9644-4eec-95ad-a31d1c56ecd1",
        name: "ALLOCATE_IN_PROGRESS",
        details: "",
        resourceName: "Cloud_vSphere_Machine_1",
        resourceType: "Cloud.vSphere.Machine",
        timestamp: "2024-02-21T13:59:53.559547Z",
        userEvent: false,
      },
      {
        id: "c7dc731b-d26d-4757-9558-031b47a7ad84",
        name: "ALLOCATE_FINISHED",
        details:
          " More Details: https://vmpautomation-dev.stg.nonprod.vmware.cba/automation-ui/#/provisioning-ui;ash=%2Frequests%2Ff6133ad4-305b-42e7-96a7-44c2f21933df",
        resourceName: "Cloud_Network_1",
        resourceType: "Cloud.Network",
        timestamp: "2024-02-21T13:59:53.383572Z",
        userEvent: false,
      },
      {
        id: "f1e58c0d-177b-4113-b019-80fc041c7a83",
        name: "ALLOCATE_IN_PROGRESS",
        details: "",
        resourceName: "Cloud_Network_1",
        resourceType: "Cloud.Network",
        timestamp: "2024-02-21T13:59:47.586851Z",
        userEvent: false,
      },
      {
        id: "b06e54ec-1c03-4eca-8d8a-5852fe126850",
        name: "ALLOCATE_FINISHED",
        details:
          " More Details: https://vmpautomation-dev.stg.nonprod.vmware.cba/automation-ui/#/provisioning-ui;ash=%2Frequests%2F52623212-e082-4968-983a-7dbe6400d548",
        resourceName: "Additional_Disk_1_Disk[0]",
        resourceType: "Cloud.Volume",
        timestamp: "2024-02-21T13:59:47.368443Z",
        userEvent: false,
      },
      {
        id: "56ffc0fc-d267-4e28-a257-ba62572ae103",
        name: "ALLOCATE_IN_PROGRESS",
        details: "",
        resourceName: "Additional_Disk_1_Disk[0]",
        resourceType: "Cloud.Volume",
        timestamp: "2024-02-21T13:59:36.966038Z",
        userEvent: false,
      },
      {
        id: "c0856c78-3de9-46ba-885c-64e2b2dcc962",
        name: "INITIALIZATION_FINISHED",
        details: "",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T13:59:36.720780Z",
        userEvent: false,
      },
      {
        id: "4b5a14a2-6008-4636-8731-9ef81da9ec14",
        name: "INITIALIZATION_IN_PROGRESS",
        details: "",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T13:59:36.381896Z",
        userEvent: false,
      },
      {
        id: "af4d77a3-d23a-4018-9f81-070e61f884de",
        name: "REQUEST_IN_PROGRESS",
        details:
          "CREATES Cloud_vSphere_Machine_1 of type Cloud.vSphere.Machine and Cloud_Network_1 of type Cloud.Network and Cloud_Puppet_1 of type Cloud.Puppet and Additional_Disk_1_Disk[0] of type Cloud.Volume",
        resourceName: "",
        resourceType: "",
        timestamp: "2024-02-21T13:59:36.061961Z",
        userEvent: false,
      },
    ];

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
      // {
      //   title: "RequestId",
      //   dataIndex: "request_id",
      //   key: "request_id",
      // },
      // {
      //   title: "TransactionId",
      //   dataIndex: "transaction_id",
      //   key: "transaction_id",
      //   width: 130,
      // },
      // {
      //   title: "Service Name",
      //   dataIndex: "service_name",
      //   key: "service_name",
      // },
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
                  onClick={() => showModal(d["tool_integration"])}
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
      render: (tag) => {
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
          </span>
        );
      },
      width: 130,
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

  let [newData, setData] = useState([]);

  useEffect(() => {
    let username = Auth.getUserProfile1();
    axios.get(`http://10.45.197.10:5000/api/transactions`).then((response) => {
      //axios.get(`http://localhost:3002`).then((response) => {
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
  }, []);

  function sendData(transactions) {
    let sendData = JSON.stringify(transactions);
    axios
      .post(`http://10.45.197.10:5000/api/transactions_post`, {
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
