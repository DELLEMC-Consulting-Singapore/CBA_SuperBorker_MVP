// import bcrypt from 'bcryptjs';

import { message } from "antd";

const errorMsg = (msg) => {
  message.error({
    content: msg,
    style: {
      marginTop: "5vh",
    },
    duration: 2,
  });
};

const Auth = {
  authenticate: async function (email, password) {
    if (email != "" && password != "") {
      try {
        localStorage.setItem("token", true);
        localStorage.setItem("username", email);
        let transactionData = this.getTransactionData();
        localStorage.setItem(
          "transactionData",
          JSON.stringify(transactionData)
        );
        await this.getUserProfile();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  isAuthenticated: function () {
    let session = localStorage.getItem("token");
    if (!session) {
      return false;
    }
    return this.isValidToken();
  },
  getUserProfile: async function () {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    if (!token) {
      throw new Error("User Not Authenticated .");
    } else {
      return {
        token,
        username,
      };
    }
  },
  getUserProfile1: function () {
    return localStorage.getItem("username1");
  },
  isValidToken: function () {
    let session = localStorage.getItem("token");
    return session ? true : false;
  },
  invalidate: function () {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  },
  getTransactions: function () {
    return JSON.parse(localStorage.getItem("transactionData"));
  },
  putTransactions: function (d) {
    let existingData = this.getTransactions();
    existingData = existingData == null ? [] : existingData;
    existingData.push(d);
    localStorage.setItem("transactionData", JSON.stringify(existingData));
    //return JSON.parse(localStorage.setItem("transactionData"))
  },
  getTransactionData: function () {
    return [
      {
        key: 0,
        request_id: "REQ2048",
        transaction_id: "1978-CJr2-1708352309500-QxIr",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "failed",
        request_status1: "failed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2048",
            transaction_id: "1978-CJr2-1708352309500-QxIr",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2048",
            transaction_id: "1978-CJr2-1708352309500-QxIr",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2048",
            transaction_id: "1978-CJr2-1708352309500-QxIr",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2048",
            transaction_id: "1978-CJr2-1708352309500-QxIr",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 1,
        request_id: "REQ2613",
        transaction_id: "6871-8G6h-1708352309500-7p7F",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "completed",
        request_status1: "completed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2613",
            transaction_id: "6871-8G6h-1708352309500-7p7F",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2613",
            transaction_id: "6871-8G6h-1708352309500-7p7F",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2613",
            transaction_id: "6871-8G6h-1708352309500-7p7F",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2613",
            transaction_id: "6871-8G6h-1708352309500-7p7F",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 2,
        request_id: "REQ2045",
        transaction_id: "1418-nuu9-1708352309500-3vIw",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "failed",
        request_status1: "failed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2045",
            transaction_id: "1418-nuu9-1708352309500-3vIw",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Error",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2045",
            transaction_id: "1418-nuu9-1708352309500-3vIw",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Error",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2045",
            transaction_id: "1418-nuu9-1708352309500-3vIw",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Error",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2045",
            transaction_id: "1418-nuu9-1708352309500-3vIw",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Error",
          },
        ],
      },
      {
        key: 3,
        request_id: "REQ2506",
        transaction_id: "0787-S9qL-1708352309500-w6SF",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "completed",
        request_status1: "completed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2506",
            transaction_id: "0787-S9qL-1708352309500-w6SF",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2506",
            transaction_id: "0787-S9qL-1708352309500-w6SF",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2506",
            transaction_id: "0787-S9qL-1708352309500-w6SF",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2506",
            transaction_id: "0787-S9qL-1708352309500-w6SF",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 4,
        request_id: "REQ2929",
        transaction_id: "9348-TW6S-1708352309500-uwpz",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "failed",
        request_status1: "failed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2929",
            transaction_id: "9348-TW6S-1708352309500-uwpz",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Error",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2929",
            transaction_id: "9348-TW6S-1708352309500-uwpz",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Error",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2929",
            transaction_id: "9348-TW6S-1708352309500-uwpz",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Error",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2929",
            transaction_id: "9348-TW6S-1708352309500-uwpz",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Error",
          },
        ],
      },
      {
        key: 5,
        request_id: "REQ2503",
        transaction_id: "3893-kYnv-1708352309500-DUT8",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "running",
        request_status1: "running",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2503",
            transaction_id: "3893-kYnv-1708352309500-DUT8",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2503",
            transaction_id: "3893-kYnv-1708352309500-DUT8",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2503",
            transaction_id: "3893-kYnv-1708352309500-DUT8",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2503",
            transaction_id: "3893-kYnv-1708352309500-DUT8",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 6,
        request_id: "REQ2077",
        transaction_id: "5093-Rek7-1708352309500-mK1e",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "completed",
        request_status1: "completed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2077",
            transaction_id: "5093-Rek7-1708352309500-mK1e",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2077",
            transaction_id: "5093-Rek7-1708352309500-mK1e",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2077",
            transaction_id: "5093-Rek7-1708352309500-mK1e",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2077",
            transaction_id: "5093-Rek7-1708352309500-mK1e",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 7,
        request_id: "REQ2336",
        transaction_id: "4309-LXaw-1708352309500-Z1zo",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "failed",
        request_status1: "failed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2336",
            transaction_id: "4309-LXaw-1708352309500-Z1zo",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2336",
            transaction_id: "4309-LXaw-1708352309500-Z1zo",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2336",
            transaction_id: "4309-LXaw-1708352309500-Z1zo",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2336",
            transaction_id: "4309-LXaw-1708352309500-Z1zo",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 8,
        request_id: "REQ2298",
        transaction_id: "9936-bTma-1708352309500-HWbO",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "running",
        request_status1: "running",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2298",
            transaction_id: "9936-bTma-1708352309500-HWbO",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2298",
            transaction_id: "9936-bTma-1708352309500-HWbO",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2298",
            transaction_id: "9936-bTma-1708352309500-HWbO",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2298",
            transaction_id: "9936-bTma-1708352309500-HWbO",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 9,
        request_id: "REQ2711",
        transaction_id: "4441-EEcc-1708352309500-AffK",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "completed",
        request_status1: "completed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2711",
            transaction_id: "4441-EEcc-1708352309500-AffK",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2711",
            transaction_id: "4441-EEcc-1708352309500-AffK",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2711",
            transaction_id: "4441-EEcc-1708352309500-AffK",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2711",
            transaction_id: "4441-EEcc-1708352309500-AffK",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 10,
        request_id: "REQ2110",
        transaction_id: "3237-5mJK-1708352309500-MAyN",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "completed",
        request_status1: "completed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2110",
            transaction_id: "3237-5mJK-1708352309500-MAyN",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2110",
            transaction_id: "3237-5mJK-1708352309500-MAyN",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2110",
            transaction_id: "3237-5mJK-1708352309500-MAyN",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2110",
            transaction_id: "3237-5mJK-1708352309500-MAyN",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 11,
        request_id: "REQ2561",
        transaction_id: "2163-SHoy-1708352309500-PTSG",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "failed",
        request_status1: "failed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2561",
            transaction_id: "2163-SHoy-1708352309500-PTSG",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2561",
            transaction_id: "2163-SHoy-1708352309500-PTSG",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2561",
            transaction_id: "2163-SHoy-1708352309500-PTSG",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2561",
            transaction_id: "2163-SHoy-1708352309500-PTSG",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 12,
        request_id: "REQ2221",
        transaction_id: "2752-xt8N-1708352309500-chE0",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "running",
        request_status1: "running",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2221",
            transaction_id: "2752-xt8N-1708352309500-chE0",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2221",
            transaction_id: "2752-xt8N-1708352309500-chE0",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2221",
            transaction_id: "2752-xt8N-1708352309500-chE0",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2221",
            transaction_id: "2752-xt8N-1708352309500-chE0",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 13,
        request_id: "REQ2683",
        transaction_id: "1387-7ddj-1708352309500-wjjR",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"RedHat Linux 8x","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "failed",
        request_status1: "failed",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2683",
            transaction_id: "1387-7ddj-1708352309500-wjjR",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Completed",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2683",
            transaction_id: "1387-7ddj-1708352309500-wjjR",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Completed",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2683",
            transaction_id: "1387-7ddj-1708352309500-wjjR",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Completed",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2683",
            transaction_id: "1387-7ddj-1708352309500-wjjR",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Completed",
          },
        ],
      },
      {
        key: 14,
        request_id: "REQ2231",
        transaction_id: "9554-DGNg-1708352309500-pjT9",
        service_name: "DevBox",
        date_time: "01-31-2024 22:03",
        service_action: "CREATE",
        payload:
          '{"os":"Windows Server 2019","cpu":"core","memory":"8","disk_drive":"500","application_stack":"vm"}',
        request_status: "running",
        request_status1: "running",
        created_by: "Admin",
        childrens: [
          {
            key: 0,
            date: "01-31-2024 22:03",
            request_id: "REQ2231",
            transaction_id: "9554-DGNg-1708352309500-pjT9",
            service_name: "DevBox",
            tool_integration: "Aria Automation",
            status: "Error",
          },
          {
            key: 1,
            date: "01-31-2024 22:03",
            request_id: "REQ2231",
            transaction_id: "9554-DGNg-1708352309500-pjT9",
            service_name: "DevBox",
            tool_integration: "Puppet",
            status: "Error",
          },
          {
            key: 2,
            date: "01-31-2024 22:03",
            request_id: "REQ2231",
            transaction_id: "9554-DGNg-1708352309500-pjT9",
            service_name: "DevBox",
            tool_integration: "Qualys",
            status: "Error",
          },
          {
            key: 3,
            date: "01-31-2024 22:03",
            request_id: "REQ2231",
            transaction_id: "9554-DGNg-1708352309500-pjT9",
            service_name: "DevBox",
            tool_integration: "ServiceNow",
            status: "Error",
          },
        ],
      },
    ];
  },
};

export default Auth;
