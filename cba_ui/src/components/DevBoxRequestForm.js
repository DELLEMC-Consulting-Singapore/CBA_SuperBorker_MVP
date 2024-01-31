import React from 'react'
import { Button, Form, Input, InputNumber } from 'antd'
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
