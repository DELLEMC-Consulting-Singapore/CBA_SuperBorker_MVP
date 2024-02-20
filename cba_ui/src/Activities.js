import React, { useState, useEffect } from "react";
import {
  CloseSquareOutlined,
  InteractionOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Tag, Tooltip } from "antd";
import axios from "axios";

function sortByKey(d) {
  return d.sort((a, b) => parseInt(b["key"]) - parseInt(a["key"]));
}

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
const Activities = () => {
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
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
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

  let [newData, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://10.45.197.10:5000`).then((response) => {
      setData(sortByKey(response["data"]));
    });
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={newData} bordered={true} size="10" />
    </>
  );
};
export default Activities;
