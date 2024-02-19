import React, { useEffect, useState } from "react";
import {
  CloseSquareOutlined,
  InteractionOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Tag, Tooltip } from "antd";

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

// const topOptions = [
//   {
//     label: 'topLeft',
//     value: 'topLeft',
//   },
//   {
//     label: 'topCenter',
//     value: 'topCenter',
//   },
//   {
//     label: 'topRight',
//     value: 'topRight',
//   },
//   {
//     label: 'none',
//     value: 'none',
//   },
// ];
// const bottomOptions = [
//   {
//     label: 'bottomLeft',
//     value: 'bottomLeft',
//   },
//   {
//     label: 'bottomCenter',
//     value: 'bottomCenter',
//   },
//   {
//     label: 'bottomRight',
//     value: 'bottomRight',
//   },
//   {
//     label: 'none',
//     value: 'none',
//   },
// ];
// const columns = [
//   {
//     title: 'Date & Time',
//     dataIndex: 'date_time',
//     key: 'date_time',
//   },
//   {
//     title: 'Request Id',
//     dataIndex: 'request_id',
//     key: 'request_id',
//     width:100
//   },
//   {
//     title: 'Transaction Id',
//     dataIndex: 'transaction_id',
//     key: 'transaction_id',
//     width:280
//   },
//   {
//     title: 'Service Name',
//     dataIndex: 'service_name',
//     key: 'service_name',
//     width:130
//   },
//   {
//     title: 'Service Action',
//     dataIndex: 'service_action',
//     key: 'service_action',
//     width:130
//   },
//   {
//     title: 'Payload',
//     dataIndex: 'payload',
//     key: 'payload',
//     //ellipsis: true,
//     ellipsis: {
//         showTitle: false,
//       },
//       render: (payload) => (
//         <Tooltip placement="topLeft" title={payload}>
//           {payload}
//         </Tooltip>
//       )
//   },
//   {
//     title: 'Status',
//     key: 'request_status',
//     dataIndex: 'request_status',
//     render: (tag) => {
//         let color = 'volcano' //tag.length > 5 ? 'geekblue' : 'green';
//         if (tag == 'running') {
//           color = 'geekblue';
//         }else if(tag == 'completed'){
//           color = 'green'
//         }

//                 console.log(tag)
//         return (<span><Tag color={color} key={tag}>
//           {tag.toUpperCase()}
//         </Tag></span>)
//     },
//     width:130
//   },
// {
//     title: 'Created By',
//     dataIndex: 'created_by',
//     key: 'created_by',
//     width:100
//   },
// //   {
// //     title: 'Action',
// //     key: 'action',
// //     render: (_, record) => (
// //       <Space size="middle">
// //         <a> {record.name}</a>
// //         <a>Delete</a>
// //       </Space>
// //     ),
// //   },
// ];
// const data = [
//   {
//     request_id: `REQ${getRandomInt()}`,
//     transaction_id: '81729-r5lPk-1706771350353-a7egb',
//     service_name: 'DevBox',
//     date_time: "01-31-2024 22:03",
//     service_action: "Create".toUpperCase(),
//     payload: JSON.stringify({'os':'linux', 'cpu':'core','memory':'8', 'disk_drive':'500', 'application_stack':'vm'}),
//     request_status:'running',
//     request_status1:'running',
//     created_by: "Admin",
//   },
//   {
//     request_id: `REQ${getRandomInt()}`,
//     transaction_id: '81729-r5lPk-1706771350353-a7egz',
//     service_name: 'DevBox',
//     date_time: "01-31-2024 22:03",
//     service_action: "Create".toUpperCase(),
//     payload: JSON.stringify({'os':'linux', 'cpu':'core','memory':'8', 'disk_drive':'500', 'application_stack':'vm'}),
//     request_status:'completed',
//     request_status1:'completed',
//     created_by: "Admin",
//   },
//   {
//     request_id: `REQ${getRandomInt()}`,
//     transaction_id: '81729-r5lPk-1706771350353-a7egx',
//     service_name: 'DevBox',
//     date_time: "01-31-2024 22:03",
//     service_action: "Create".toUpperCase(),
//     payload: JSON.stringify({'os':'linux', 'cpu':'core','memory':'8', 'disk_drive':'500', 'application_stack':'vm'}),
//     request_status:'failed',
//     request_status1:'failed',
//     created_by: "Admin",
//   }
// ];
// const TransactionStatus = () => {
//   const [top, setTop] = useState('topLeft');
//   const [bottom, setBottom] = useState('bottomRight');
//   return (
//     <div>
//       <div>
//         {/* <Radio.Group
//           style={{
//             marginBottom: 10,
//           }}
//           options={topOptions}
//           value={top}
//           onChange={(e) => {
//             setTop(e.target.value);
//           }}
//         /> */}
//       </div>
//       {/* <Radio.Group
//         style={{
//           marginBottom: 10,
//         }}
//         options={bottomOptions}
//         value={bottom}
//         onChange={(e) => {
//           setBottom(e.target.value);
//         }}
//       /> */}
//       <Table
//         columns={columns}
//         pagination={{
//           position: [bottom],
//         }}
//         dataSource={data}
//       />
//     </div>
//   );
// };
// export default TransactionStatus;

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
        title: "Resume",
        key: "resume",
        render: (d) => {
          //  let color = 'error' //tag.length > 5 ? 'geekblue' : 'green';
          //  if (d['status'] == 'Running') {
          //    color = 'processing';
          //  }else if(d['status']  == 'Completed'){
          //          color = 'success'
          //        }
          return (
            <span style={{ fontSize: 25 }}>
              <InteractionOutlined
                height={"1em"}
                width={"1em"}
                onClick={() => handleResume(d)}
              />
            </span>
          );
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
          return (
            <span style={{ fontSize: 25 }}>
              <CloseSquareOutlined onClick={() => handleRevoke(d)} />
            </span>
          );
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
        dataSource={data["childerns"]}
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
  const data = [
    {
      key: 0,
      request_id: `REQ${getRandomInt()}`,
      transaction_id: "81729-r5lPk-1706771350353-a7egb",
      service_name: "DevBox",
      date_time: "01-31-2024 22:03",
      service_action: "Create".toUpperCase(),
      payload: JSON.stringify({
        os: "linux",
        cpu: "core",
        memory: "8",
        disk_drive: "500",
        application_stack: "vm",
      }),
      request_status: "running",
      request_status1: "running",
      created_by: "Admin",
      childerns: [
        {
          key: 0,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egb",
          service_name: parentData["service_name"],
          tool_integration: "Aria Automation",
          status: "Completed",
        },
        {
          key: 1,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egb",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "Puppet",
          status: "Running",
        },
        {
          key: 2,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egb",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "Qualys",
          status: "Running",
        },
        {
          key: 3,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egb",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "ServiceNow",
          status: "Running",
        },
      ],
    },
    {
      key: 1,
      request_id: `REQ${getRandomInt()}`,
      transaction_id: "81729-r5lPk-1706771350353-a7egz",
      service_name: "DevBox",
      date_time: "01-31-2024 22:03",
      service_action: "Create".toUpperCase(),
      payload: JSON.stringify({
        os: "linux",
        cpu: "core",
        memory: "8",
        disk_drive: "500",
        application_stack: "vm",
      }),
      request_status: "completed",
      request_status1: "completed",
      created_by: "Admin",
      childerns: [
        {
          key: 0,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egz",
          service_name: parentData["service_name"],
          tool_integration: "Aria Automation",
          status: "Completed",
        },
        {
          key: 1,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egz",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "Puppet",
          status: "Error",
        },
        {
          key: 2,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egz",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "Qualys",
          status: "Completed",
        },
        {
          key: 3,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egz",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "ServiceNow",
          status: "Completed",
        },
      ],
    },
    {
      key: 2,
      request_id: `REQ${getRandomInt()}`,
      transaction_id: "81729-r5lPk-1706771350353-a7egx",
      service_name: "DevBox",
      date_time: "01-31-2024 22:03",
      service_action: "Create".toUpperCase(),
      payload: JSON.stringify({
        os: "linux",
        cpu: "core",
        memory: "8",
        disk_drive: "500",
        application_stack: "vm",
      }),
      request_status: "failed",
      request_status1: "failed",
      created_by: "Admin",
      childerns: [
        {
          key: 0,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egx",
          service_name: parentData["service_name"],
          tool_integration: "Aria Automation",
          status: "Completed",
        },
        {
          key: 1,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egx",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "Puppet",
          status: "Error",
        },
        {
          key: 2,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egx",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "Qualys",
          status: "Completed",
        },
        {
          key: 3,
          date: "01-31-2024 22:03",
          request_id: `REQ${getRandomInt()}`,
          transaction_id: "81729-r5lPk-1706771350353-a7egx",
          service_name: parentData["service_name"],
          date: "01-31-2024 22:03",
          tool_integration: "ServiceNow",
          status: "Completed",
        },
      ],
    },
  ];

  let [newData, setData] = useState(data);

  let handleResume = (resumeData) => {
    let i = 0;
    newData.map((d) => {
      d["childerns"].map((childerns) => {
        if (childerns["transaction_id"] == resumeData["transaction_id"]) {
          if (resumeData["status"] == "Error") {
            console.log(newData[i]["childerns"][resumeData["key"]]["status"]);
            newData[i]["childerns"][resumeData["key"]]["status"] = "Running";
            //console.log(newData["childerns"][resumeData["key"]]["status"]);
            //newData["childerns"][resumeData["key"]]["status"] = "Running";
            //setData(newData);
            setData([...newData]);
          }
        }
      });
      i++;
    });
  };

  let handleRevoke = (resumeData) => {
    let j = 0;
    if (resumeData["status"] == "Error") {
      newData.map((d) => {
        if (d["transaction_id"] == resumeData["transaction_id"]) {
          d["childerns"].map((childerns) => {
            //if (resumeData["status"] == "Error") {
            console.log(childerns["status"]);
            //childerns["status"] = "Revoked";
            newData[j]["childerns"][childerns["key"]]["status"] = "Revoked";
            newData[j]["request_status"] = "Revoked";
            newData[j]["request_status1"] = "Revoked";
            //}
          });
        }

        j++;
      });
      setData([...newData]);
      console.log("Revoked newData::", newData);
    }
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
      />
    </>
  );
};
export default TransactionStatus;
