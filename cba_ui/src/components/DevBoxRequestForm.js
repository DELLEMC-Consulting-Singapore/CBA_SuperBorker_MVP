import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import moment from "moment";
function errorMessage() {
  Modal.error({
    content: `Internal Server Error. Please try after sometime`,
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

  let insertLocalStorage = (payload) => {
    // Auth.putTransactions(newPayload);
    // axios
    //   .get(`http://localhost:3002`)
    //   .then((response1) =>
    {
      let transactions = null;
      transactions = transactions == null ? [] : transactions;
      let newPayload = payload["payload"];
      //newPayload["key"] = transactions.length + 1;
      newPayload["date_time"] = moment(new Date()).format("MM-DD-YYYY HH:mm");
      newPayload["request_status"] = "running";
      newPayload["request_status1"] = "running";
      newPayload["created_by"] = "gutturra";
      newPayload["request_id"] = newPayload["requestId"];
      newPayload["transaction_id"] = newPayload["transactionId"];
      newPayload["payload"] = JSON.stringify(newPayload["payload"]);
      newPayload["service_name"] = "DevBox";
      newPayload["service_action"] = "CREATE";
      newPayload["deployment_id"] = newPayload["deployment_id"];
      newPayload["deployment_name"] = newPayload["deployment_name"];
      newPayload["deploy_status"] = {
        id: "377609b1-f166-4206-a30c-b83de2be541c",
        name: "deployment_377609b1-f166-4206-a30c-b83de2be541c",
        orgId: "69bb0283-5024-409b-a1df-829a911cf6b0",
        catalogItemId: "4c31e0fc-02f9-354d-b4c7-088ea2d0bfad",
        catalogItemVersion: "24",
        blueprintId: "6bb0b94f-ba27-4925-847f-22b9162da013",
        blueprintVersion: "24",
        iconId: "13a3d6b7-5185-3995-820f-4968f18daa69",
        createdAt: moment(new Date()).format("MM-DD-YYYY HH:mm"),
        createdBy: "gutturra",
        ownedBy: "gutturra",
        ownerType: "USER",
        lastUpdatedAt: "2024-02-21T14:59:42.220618Z",
        lastUpdatedBy: "gutturra",
        leaseExpireAt: "2024-02-28T14:59:00Z",
        leaseGracePeriodDays: 5,
        status: "CREATE_IN_PROGRESS",
      };
      newPayload["deploy_status_history"] = [
        {
          id: "4b5a14a2-6008-4636-8731-9ef81da9ec14",
          name: "INITIALIZATION_IN_PROGRESS",
          details: "",
          resourceName: "",
          resourceType: "",
          timestamp: moment().format(),
          userEvent: false,
        },
        {
          id: "af4d77a3-d23a-4018-9f81-070e61f884de",
          name: "REQUEST_IN_PROGRESS",
          details:
            "CREATES Cloud_vSphere_Machine_1 of type Cloud.vSphere.Machine and Cloud_Network_1 of type Cloud.Network and Cloud_Puppet_1 of type Cloud.Puppet and Additional_Disk_1_Disk[0] of type Cloud.Volume",
          resourceName: "",
          resourceType: "",
          timestamp: moment().format(),
          userEvent: false,
        },
      ];
      newPayload["childrens"] = [
        {
          key: 0,
          date: newPayload["date_time"],
          request_id: newPayload["requestId"],
          transaction_id: newPayload["transactionId"],
          service_name: "DevBox",
          tool_integration: "Aria Automation",
          status: "Running",
          deployment_id: newPayload["deployment_id"],
          deployment_name: newPayload["deployment_name"],
          incident: `INC${getRandomInt1()}`,
          no_of_retry: 0,
        },
        {
          key: 1,
          date: newPayload["date_time"],
          request_id: newPayload["requestId"],
          transaction_id: newPayload["transactionId"],
          service_name: "DevBox",
          tool_integration: "Puppet",
          status: "Running",
          deployment_id: newPayload["deployment_id"],
          deployment_name: newPayload["deployment_name"],
          incident: `INC${getRandomInt1()}`,
          no_of_retry: 0,
        },
        // {
        //   key: 2,
        //   date: newPayload["date_time"],
        //   request_id: newPayload["requestId"],
        //   transaction_id: newPayload["transactionId"],
        //   service_name: "DevBox",
        //   tool_integration: "Qualys",
        //   status: "Running",
        //   deployment_id: newPayload["deployment_id"],
        //   deployment_name: newPayload["deployment_name"],
        // },
        // {
        //   key: 3,
        //   date: newPayload["date_time"],
        //   request_id: newPayload["requestId"],
        //   transaction_id: newPayload["transactionId"],
        //   service_name: "DevBox",
        //   tool_integration: "ServiceNow",
        //   status: "Running",
        //   deployment_id: newPayload["deployment_id"],
        //   deployment_name: newPayload["deployment_name"],
        // },
      ];
      transactions.push(newPayload);
      let sendData = JSON.stringify(transactions);
      axios
        .post(`http://10.45.197.10:5000/api/transactions`, { data: sendData })
        //.post(`http://localhost:3002/`, { data: sendData })
        .then((response) => {
          setSpinning(false);
        })
        .catch((error) => {
          setSpinning(false);
        });
    }
  };
  const onFinish = (values) => {
    setSpinning(true);
    let transactionId = `${randomNumeric(4)}-${randomString(
      4
    )}-${new Date().valueOf()}-${randomString(4)}`;
    values["payload"]["transactionId"] = transactionId;
    let requestId = `REQ${getRandomInt()}`;
    values["payload"]["requestId"] = requestId;
    // values["payload"]["deployment_id"] = "1231231-sdgsdg-345123";
    // values["payload"]["deployment_name"] = "sdfsdf";
    // insertLocalStorage(values);
    axios
      .post(`http://10.45.197.10:5000/api/deploy`, values)
      .then((response) => {
        if (response.status === 200) {
          let responseData = response["data"];
          success(requestId);
          values["payload"]["deployment_id"] = responseData["deployment_id"];
          values["payload"]["deployment_name"] =
            responseData["deployment_name"];
          values["payload"]["response"] = JSON.stringify(responseData);
          insertLocalStorage(values);
        }
      })
      .catch((error) => {
        console.log("incatch::", error);
        //errorMessage()
        success(requestId);
        //values["payload"]["response"] = JSON.stringify(error);
        insertLocalStorage(values);
      });
    form.resetFields();
  };

  function success(requestId) {
    const success = Modal.success({});
    success.update({
      title: "",
      content: `Request ${requestId} has been opened successfully`,
      onOk: async () => {
        navigate("/activities", { replace: true });
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
