import React, { useState } from 'react';
import { Radio, Space, Table, Tag, Badge } from 'antd';

function getRandomInt(min = 2000, max = 2999) {
  
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'RequestId',
    dataIndex: 'request_id',
    key: 'request_id',
  },
  {
    title: 'TransactionId',
    dataIndex: 'transaction_id',
    key: 'transaction_id',
  },
  {
    title: 'Service Name',
    dataIndex: 'service_name',
    key: 'service_name',
  },
  {
    title: 'Tool Integration',
    dataIndex: 'tool_integration',
    key: 'tool_integration',
  },
  {
    title: 'Status',
    key: 'status',
    render: (d) => {
      let color = 'error' //tag.length > 5 ? 'geekblue' : 'green';
      if (d['status'] == 'Running') {
        color = 'processing';
      }else if(d['status']  == 'Completed'){
              color = 'success'
            } 
    return <Badge status={color} text={d['status']} />
    }
    
   }
];
const data = [
  {
    key:0,
    date: "01-31-2024 22:03",
    request_id: `REQ${getRandomInt()}`,
    transaction_id: "81729-r5lPk-1706771350353-a7egx",
    service_name: 'DevBox',       
    tool_integration: "Qualys",
    status:"Running"
  },
  {
    key:1,
    date: "01-31-2024 22:03",
    request_id: `REQ${getRandomInt()}`,
    transaction_id: "81729-r5lPk-1706771350353-a7egb",
    service_name: 'DevBox',   
    tool_integration: "Qualys",
    status:"Completed"
  },
  {
    key:2,
    date: "01-31-2024 22:03",
    request_id: `REQ${getRandomInt()}`,
    transaction_id: "81729-r5lPk-1706771350353-a7egz",
    service_name: 'DevBox',      
    tool_integration: "Qualys",
    status:"Completed"
  }
];
const Qualys = () => {
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
export default Qualys;