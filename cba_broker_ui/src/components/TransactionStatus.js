import React, { useEffect, useState } from "react";
import {
  CloseSquareOutlined,
  InteractionOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import Auth from "./Auth";
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
  const expandedRowRender1 = (data) => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "RequestId",
        dataIndex: "request_id",
        key: "request_id",
      },
      {
        title: "TransactionId",
        dataIndex: "transaction_id",
        key: "transaction_id",
        width: 130,
      },
      {
        title: "Service Name",
        dataIndex: "service_name",
        key: "service_name",
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
        title: "No. of Retry",
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
          //  let color = 'error' //tag.length > 5 ? 'geekblue' : 'green';
          //  if (d['status'] == 'Running') {
          //    color = 'processing';
          //  }else if(d['status']  == 'Completed'){
          //          color = 'success'
          //
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
        title: "Revoke",
        key: "revoke",
        render: (d) => {
          // let color = 'error' //tag.length > 5 ? 'geekblue' : 'green';
          // if (d['status'] == 'Running') {
          //   color = 'processing';
          // }else if(d['status']  == 'Completed'){
          //         color = 'success'
          //       }
          if (d["status"] == "Error") {
            return (
              <span style={{ fontSize: 25 }}>
                <CloseSquareOutlined onClick={() => handleRevoke(d)} />
              </span>
            );
          }
        },
      },
      {
        title: "Error Log",
        key: "error_log",
        render: (d) => {
          let color = "error"; //tag.length > 5 ? 'geekblue' : 'green';
          if (d["status"] == "Running") {
            color = "processing";
          } else if (d["status"] == "Completed") {
            color = "success";
          }

          return (
            <a href="/logs/logs-INC124567.log" download target="_blank">
              <span style={{ fontSize: 25 }}>
                <DownloadOutlined />
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
    // let data = [];
    // if (parentData["key"] == 0) {
    //   data = [
    //     {
    //       key: 0,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       tool_integration: "Aria Automation",
    //       status: "Completed",
    //     },
    //     {
    //       key: 1,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "Puppet",
    //       status: "Running",
    //     },
    //     {
    //       key: 2,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "Qualys",
    //       status: "Running",
    //     },
    //     {
    //       key: 3,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "ServiceNow",
    //       status: "Running",
    //     },
    //   ];
    // }

    // if (parentData["key"] == 1) {
    //   data = [
    //     {
    //       key: 0,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       tool_integration: "Aria Automation",
    //       status: "Completed",
    //     },
    //     {
    //       key: 1,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "Puppet",
    //       status: "Completed",
    //     },
    //     {
    //       key: 2,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "Qualys",
    //       status: "Completed",
    //     },
    //     {
    //       key: 3,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "ServiceNow",
    //       status: "Completed",
    //     },
    //   ];
    // }

    // if (parentData["key"] == 2) {
    //   data = [
    //     {
    //       key: 0,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       tool_integration: "Aria Automation",
    //       status: "Completed",
    //     },
    //     {
    //       key: 1,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "Puppet",
    //       status: "Error",
    //     },
    //     {
    //       key: 2,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "Qualys",
    //       status: "Completed",
    //     },
    //     {
    //       key: 3,
    //       date: "01-31-2024 22:03",
    //       request_id: parentData["request_id"],
    //       transaction_id: parentData["transaction_id"],
    //       service_name: parentData["service_name"],
    //       date: "01-31-2024 22:03",
    //       tool_integration: "ServiceNow",
    //       status: "Completed",
    //     },
    //   ];
    // }
    return (
      <Table
        columns={columns}
        dataSource={data["childrens"]}
        pagination={false}
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

  // const data = [
  //   {
  //     key: 0,
  //     request_id: `REQ${getRandomInt()}`,
  //     transaction_id: "81729-r5lPk-1706771350353-a7egb",
  //     service_name: "DevBox",
  //     date_time: "01-31-2024 22:03",
  //     service_action: "Create".toUpperCase(),
  //     payload: JSON.stringify({
  //       os: "linux",
  //       cpu: "core",
  //       memory: "8",
  //       disk_drive: "500",
  //       application_stack: "vm",
  //     }),
  //     request_status: "running",
  //     request_status1: "running",
  //     created_by: "Admin",
  //     childerns: [
  //       {
  //         key: 0,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egb",
  //         service_name: parentData["service_name"],
  //         tool_integration: "Aria Automation",
  //         status: "Completed",
  //       },
  //       {
  //         key: 1,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egb",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "Puppet",
  //         status: "Running",
  //       },
  //       {
  //         key: 2,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egb",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "Qualys",
  //         status: "Running",
  //       },
  //       {
  //         key: 3,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egb",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "ServiceNow",
  //         status: "Running",
  //       },
  //     ],
  //   },
  //   {
  //     key: 1,
  //     request_id: `REQ${getRandomInt()}`,
  //     transaction_id: "81729-r5lPk-1706771350353-a7egz",
  //     service_name: "DevBox",
  //     date_time: "01-31-2024 22:03",
  //     service_action: "Create".toUpperCase(),
  //     payload: JSON.stringify({
  //       os: "linux",
  //       cpu: "core",
  //       memory: "8",
  //       disk_drive: "500",
  //       application_stack: "vm",
  //     }),
  //     request_status: "completed",
  //     request_status1: "completed",
  //     created_by: "Admin",
  //     childerns: [
  //       {
  //         key: 0,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egz",
  //         service_name: parentData["service_name"],
  //         tool_integration: "Aria Automation",
  //         status: "Completed",
  //       },
  //       {
  //         key: 1,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egz",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "Puppet",
  //         status: "Error",
  //       },
  //       {
  //         key: 2,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egz",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "Qualys",
  //         status: "Completed",
  //       },
  //       {
  //         key: 3,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egz",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "ServiceNow",
  //         status: "Completed",
  //       },
  //     ],
  //   },
  //   {
  //     key: 2,
  //     request_id: `REQ${getRandomInt()}`,
  //     transaction_id: "81729-r5lPk-1706771350353-a7egx",
  //     service_name: "DevBox",
  //     date_time: "01-31-2024 22:03",
  //     service_action: "Create".toUpperCase(),
  //     payload: JSON.stringify({
  //       os: "linux",
  //       cpu: "core",
  //       memory: "8",
  //       disk_drive: "500",
  //       application_stack: "vm",
  //     }),
  //     request_status: "failed",
  //     request_status1: "failed",
  //     created_by: "Admin",
  //     childerns: [
  //       {
  //         key: 0,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egx",
  //         service_name: parentData["service_name"],
  //         tool_integration: "Aria Automation",
  //         status: "Completed",
  //       },
  //       {
  //         key: 1,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egx",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "Puppet",
  //         status: "Error",
  //       },
  //       {
  //         key: 2,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egx",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "Qualys",
  //         status: "Completed",
  //       },
  //       {
  //         key: 3,
  //         date: "01-31-2024 22:03",
  //         request_id: `REQ${getRandomInt()}`,
  //         transaction_id: "81729-r5lPk-1706771350353-a7egx",
  //         service_name: parentData["service_name"],
  //         date: "01-31-2024 22:03",
  //         tool_integration: "ServiceNow",
  //         status: "Completed",
  //       },
  //     ],
  //   },
  // ];

  let [newData, setData] = useState([]);

  useEffect(() => {
    let username = Auth.getUserProfile1();
    console.log(username);
    axios.get(`http://10.45.197.10:5000`).then((response) => {
      let responseData = sortByKey(response["data"]);
      let newdata = responseData.map((r) => {
        if (username == "puppetuser" || username == "puppet") {
          let puppet = r["childrens"].filter((c) => {
            if (c["tool_integration"] == "Puppet") {
              return c;
            }
          });
          console.log(puppet);
          r["childrens"] = [...puppet];
        }

        return r;
      });
      console.log("NewData", newdata);
      setData(sortByKey(newdata));
    });
  }, []);

  function sendData(transactions) {
    let sendData = JSON.stringify(transactions);
    axios
      .put(`http://10.45.197.10:5000`, { data: sendData })
      .then((response) => {
        // if (response.status === 201) {
        //   success(requestId);
        //   insertLocalStorage(values);
        // }
      })
      .catch((error) => {
        // console.log("incatch::", error);
        // //errorMessage()
        // success(requestId);
        // insertLocalStorage(values);
      });
  }
  let handleResume = (resumeData) => {
    let i = 0;
    let no_of_error = 0;
    let index = 0;
    newData.map((d) => {
      d["childrens"].map((childerns) => {
        if (childerns["transaction_id"] == resumeData["transaction_id"]) {
          if (childerns["status"] == "Error") {
            if (childerns["key"] == resumeData["key"]) {
              newData[i]["childrens"][resumeData["key"]]["status"] = "Running";
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
    </>
  );
};
export default TransactionStatus;
