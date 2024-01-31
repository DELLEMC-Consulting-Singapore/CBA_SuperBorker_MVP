import React, { useState } from 'react';
import { Radio, Space, Table, Tag, Tooltip } from 'antd';
const topOptions = [
  {
    label: 'topLeft',
    value: 'topLeft',
  },
  {
    label: 'topCenter',
    value: 'topCenter',
  },
  {
    label: 'topRight',
    value: 'topRight',
  },
  {
    label: 'none',
    value: 'none',
  },
];
const bottomOptions = [
  {
    label: 'bottomLeft',
    value: 'bottomLeft',
  },
  {
    label: 'bottomCenter',
    value: 'bottomCenter',
  },
  {
    label: 'bottomRight',
    value: 'bottomRight',
  },
  {
    label: 'none',
    value: 'none',
  },
];
const columns = [
  {
    title: 'Order No',
    dataIndex: 'order_no',
    key: 'order_no',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Service Name',
    dataIndex: 'service_name',
    key: 'service_name',
  },
  {
    title: 'Date & Time',
    dataIndex: 'date_time',
    key: 'date_time',
  },
  {
    title: 'Service Action',
    dataIndex: 'service_action',
    key: 'service_action',
  },
  {
    title: 'Payload Request',
    dataIndex: 'payload',
    key: 'payload',
    //ellipsis: true,
    ellipsis: {
        showTitle: false,
      },
      render: (payload) => (
        <Tooltip placement="topLeft" title={payload}>
          {payload}
        </Tooltip>
      )
  },
  {
    title: 'Request Status',
    key: 'request_status',
    dataIndex: 'request_status',
    render: (tag) => { 
        let color = 'volcano' //tag.length > 5 ? 'geekblue' : 'green';
        if (tag == 'running') {
          color = 'geekblue';
        }else if(tag == 'completed'){
          color = 'green'
        }  

                console.log(tag)
        return (<span><Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag></span>)
    },
  },
{
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
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
const data = [
  {
    order_no: '1',
    service_name: 'VM',
    date_time: "01-31-2024 22:03",
    service_action: "Create",
    payload: JSON.stringify({'os':'linux', 'cpu':'core','memory':'8', 'disk_drive':'500', 'application_stack':'vm'}),
    request_status:'running',
    request_status1:'running',
    created_by: "Admin",
  },
  {
    order_no: '1',
    service_name: 'VM',
    date_time: "01-31-2024 22:03",
    service_action: "Create",
    payload: JSON.stringify({'os':'linux', 'cpu':'core','memory':'8', 'disk_drive':'500', 'application_stack':'vm'}),
    request_status:'completed',
    request_status1:'completed',
    created_by: "Admin",
  },
  {
    order_no: '1',
    service_name: 'VM',
    date_time: "01-31-2024 22:03",
    service_action: "Create",
    payload: JSON.stringify({'os':'linux', 'cpu':'core','memory':'8', 'disk_drive':'500', 'application_stack':'vm'}),
    request_status:'failed',
    request_status1:'failed',
    created_by: "Admin",
  }
];
const TransactionStatus = () => {
  const [top, setTop] = useState('topLeft');
  const [bottom, setBottom] = useState('bottomRight');
  return (
    <div>
      <div>
        {/* <Radio.Group
          style={{
            marginBottom: 10,
          }}
          options={topOptions}
          value={top}
          onChange={(e) => {
            setTop(e.target.value);
          }}
        /> */}
      </div>
      {/* <Radio.Group
        style={{
          marginBottom: 10,
        }}
        options={bottomOptions}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      /> */}
      <Table
        columns={columns}
        pagination={{
          position: [bottom],
        }}
        dataSource={data}
      />
    </div>
  );
};
export default TransactionStatus;