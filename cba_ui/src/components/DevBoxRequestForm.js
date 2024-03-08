import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { SERVICE_API } from "../config/config";
import moment from "moment";
function errorMessage() {
  Modal.error({
    content: ` Please try after sometime.`,
  });
}

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

function getRandomInt1(min = 100000, max = 999999) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getRandomInt(min = 2000, max = 2999) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export const DevBoxRequestForm = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [spinning, setSpinning] = useState(false);

  const value = queryString.parse(window.location.search);
  let os = value.os;
  if (os == "windows-server-2019") {
    os = "Windows Server 2019";
  } else {
    os = "RedHat Linux 8x";
  }
  
  const onFinish = async (values) => {
    setSpinning(true);
    let userInfo = await Auth.getUserProfile()
    //userInfo = JSON.parse(userInfo["token"])
    values["payload"]["lan_id"] = userInfo["username"];
    let newPlayload = values["payload"]
    newPlayload["source"] = "UI"
    axios
      .post(`${SERVICE_API}/devbox/create`, newPlayload)
      .then((response) => {
        if (response.status === 201) {
          let responseData = response["data"];
          success(responseData["req_id"]);          
        }
      })
      .catch((error) => {
        console.log("incatch::", error);
        errorMessage()
      });
    form.resetFields();
  };

  function success(requestId) {
    const success = Modal.success({});
    success.update({
      title: "",
      content: `Request ${requestId} has been opened successfully`,
      //content: `Request has been opened successfully`,
      onOk: async () => {
        navigate("/activities", { replace: true });
        navigate(0)
      },
    });
  }

  return (
    <Form
      {...layout}
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 950,
      }}
      validateMessages={validateMessages}
    >
      {/* <Form.Item
        name={["payload", "os"]}
        label="Operating System"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select Operating System"
          options={[
            {
              value: "Windows Server 2019",
              label: "Windows Server 2019",
            },
            {
              value: "RedHat Linux 8x",
              label: "RedHat Linux 8x",
            },
          ]}
        />
      </Form.Item> */}
      <Form.Item
        name={["payload", "os"]}
        label="Operating System"
        initialValue={os}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        name={["payload", "cpu"]}
        label="CPU"
        initialValue={4}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={["payload", "memory"]}
        label="Memory (In GB)"
        initialValue={16}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={["payload", "boot_disk"]}
        label="Boot Disk (In GB)"
        initialValue={90}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={["payload", "disk_drive_1"]}
        label="Disk Drive 1 (In GB)"
        initialValue={10}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={["payload", "disk_drive_2"]}
        label="Disk Drive 2 (In GB)"
        initialValue={10}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      {/* <Form.Item
        name={['payload', 'application_stack']}
        label="Application Stack (Only One)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item> */}

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
            backgroundColor: "#fc0",
            color: "#231f20",
          }}
        >
          Submit
        </Button>
      </Form.Item>
      <Spin spinning={spinning} fullscreen />
    </Form>
  );
};
