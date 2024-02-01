import React from 'react'
import { Button, Form, Input, InputNumber } from 'antd'

function randomString(length) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function randomNumeric(length) {
  var chars = "0123456789";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const onFinish = (values) => {  
  let orderId = randomNumeric(5)+"-"+randomString(5)+'-'+new Date().valueOf()+"-"+randomString(5)
  values['payload']['orderId'] = orderId
  console.log(values)
}

export const DevBoxRequestForm = () => {
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['payload', 'os']}
        label="Operating System"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['payload', 'cpu']}
        label="CPU"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['payload', 'memory']}
        label="Memory (In GB)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['payload', 'disk_drive']}
        label="Disk Drive (In GB)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['payload', 'application_stack']}
        label="Application Stack (Only One)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          class="button-css"
          style={{
            'background-color': '#fc0',
            color: '#231f20',
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
