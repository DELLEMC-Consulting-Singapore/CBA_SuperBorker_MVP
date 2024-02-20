import React from "react";
import { Layout } from "antd";
import "./css/batch.css";
import "./css/sh_theme.css";

export const ApiDocs = () => {
  return (
    <>
      <Layout style={{ background: "#fff" }}>
        <div></div>
        <div
          class="code panel pdl conf-macro output-block"
          style={{ borderWidth: 1 }}
          data-hasbody="true"
          data-macro-name="code"
        >
          <div
            class="codeHeader panelHeader pdl"
            style={{ borderBottomWidth: 1 }}
          >
            <b>Step 1: Generate Refresh Token using User credentials</b>
          </div>
          <div class="codeContent panelContent pdl">
            <div>
              <div
                id="highlighter_261927"
                class="syntaxhighlighter sh-midnight csharp"
              >
                <table border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="gutter">
                        <div class="line number1 index0 alt2">1</div>
                        <div class="line number2 index1 alt1">2</div>
                        <div class="line number3 index2 alt2">3</div>
                        <div class="line number4 index3 alt1">4</div>
                        <div class="line number5 index4 alt2">5</div>
                        <div class="line number6 index5 alt1">6</div>
                        <div class="line number7 index6 alt2">7</div>
                        <div class="line number8 index7 alt1">8</div>
                      </td>
                      <td class="code">
                        <div
                          class="container"
                          title="Hint: double-click to select code"
                        >
                          {/* <div
                            class="line number1 index0 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp plain">{"{"}</code>
                          </div> */}
                          <div
                            class="line number2 index1 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">curl -X POST \</code>
                            {/* <code class="csharp plain">: GUID,&nbsp; </code> */}
                            {/* <code class="csharp comments">
                              // Your existing planId
                            </code> */}
                          </div>
                          <div
                            class="line number3 index2 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              'https://vmpautomation.prod.vmware.cba/csp/gateway/am/api/login?access_token='
                              \
                            </code>
                            {/* <code class="csharp plain">: GUID,</code> */}
                          </div>
                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              {" "}
                              --header 'Accept: application/json' \
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number5 index4 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              --header 'Content-Type: application/json' \
                            </code>
                            {/* <code class="csharp plain">: TROUXID,</code> */}
                          </div>
                          <div
                            class="line number6 index5 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">--data-raw '{"{"}</code>
                            {/* <code class="csharp plain">: DC, </code> */}
                            {/* <code class="csharp comments">
                              // DURHAM-DEV, RR2C-NONPROD, DURHAM-PROD,
                              PC1-PROD, S3B-PROD, LIMERICK-PROD,
                              LIMERICK-NONPROD
                            </code> */}
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">
                              "username": "yourLANID",
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number8 index7 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; {"  "}
                            </code>
                            <code class="csharp string">
                              "password": "yourLANPW"
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number9 index8 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">{"}'"}</code>
                            {/* <code class="csharp plain">: </code>
                            <code class="csharp string">"ON or OFF"</code>
                            <code class="csharp plain">, </code>
                            <code class="csharp comments">// ON/OFF</code> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <div
          class="code panel pdl conf-macro output-block"
          style={{ borderWidth: 1 }}
          data-hasbody="true"
          data-macro-name="code"
        >
          <div
            class="codeHeader panelHeader pdl"
            style={{ borderBottomWidth: 1 }}
          >
            <b>Step 2: Generate bearer / access token</b>
          </div>
          <p>Use the Refresh token value generated at Step 1.</p>
          <div class="codeContent panelContent pdl">
            <div>
              <div
                id="highlighter_261927"
                class="syntaxhighlighter sh-midnight csharp"
              >
                <table border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="gutter">
                        <div class="line number1 index0 alt2">1</div>
                        <div class="line number2 index1 alt1">2</div>
                        <div class="line number3 index2 alt2">3</div>
                        <div class="line number4 index3 alt1">4</div>
                        <div class="line number5 index4 alt2">5</div>
                        <div class="line number6 index5 alt1">6</div>
                        <div class="line number7 index6 alt2">7</div>
                      </td>
                      <td class="code">
                        <div
                          class="container"
                          title="Hint: double-click to select code"
                        >
                          {/* <div
                            class="line number1 index0 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp plain">{"{"}</code>
                          </div> */}
                          <div
                            class="line number2 index1 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">curl -X POST \</code>
                            {/* <code class="csharp plain">: GUID,&nbsp; </code> */}
                            {/* <code class="csharp comments">
                              // Your existing planId
                            </code> */}
                          </div>
                          <div
                            class="line number3 index2 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              'https://vmpautomation.prod.vmware.cba/iaas/api/login'
                              \
                            </code>
                            {/* <code class="csharp plain">: GUID,</code> */}
                          </div>
                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              {" "}
                              --header 'Accept: application/json' \
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number5 index4 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              --header 'Content-Type: application/json' \
                            </code>
                            {/* <code class="csharp plain">: TROUXID,</code> */}
                          </div>
                          <div
                            class="line number6 index5 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">--data-raw '{"{"}</code>
                            {/* <code class="csharp plain">: DC, </code> */}
                            {/* <code class="csharp comments">
                              // DURHAM-DEV, RR2C-NONPROD, DURHAM-PROD,
                              PC1-PROD, S3B-PROD, LIMERICK-PROD,
                              LIMERICK-NONPROD
                            </code> */}
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">
                              "refreshToken": ""
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>

                          <div
                            class="line number9 index8 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">{"}'"}</code>
                            {/* <code class="csharp plain">: </code>
                            <code class="csharp string">"ON or OFF"</code>
                            <code class="csharp plain">, </code>
                            <code class="csharp comments">// ON/OFF</code> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <div
          class="code panel pdl conf-macro output-block"
          style={{ borderWidth: 1 }}
          data-hasbody="true"
          data-macro-name="code"
        >
          <div
            class="codeHeader panelHeader pdl"
            style={{ borderBottomWidth: 1 }}
          >
            <b>Step 3: Invoke Aria Automation Rest APIs</b>
          </div>
          <p>Use the Breare / Access Token generated at Step 2.</p>
          <b>
            Payload to request 'Windows Server (DevBox)' with Default options
          </b>
          <div class="codeContent panelContent pdl">
            <div>
              <div
                id="highlighter_261927"
                class="syntaxhighlighter sh-midnight csharp"
              >
                <table border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="gutter">
                        <div class="line number1 index0 alt2">1</div>
                        <div class="line number2 index1 alt1">2</div>
                        <div class="line number3 index2 alt2">3</div>
                        <div class="line number4 index3 alt1">4</div>
                        <div class="line number5 index4 alt2">5</div>
                        <div class="line number6 index5 alt1">6</div>
                        <div class="line number7 index6 alt2">7</div>
                        <div class="line number8 index7 alt1">8</div>
                      </td>
                      <td class="code">
                        <div
                          class="container"
                          title="Hint: double-click to select code"
                        >
                          {/* <div
                            class="line number1 index0 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp plain">{"{"}</code>
                          </div> */}
                          <div
                            class="line number2 index1 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">curl -X POST \</code>
                            {/* <code class="csharp plain">: GUID,&nbsp; </code> */}
                            {/* <code class="csharp comments">
                              // Your existing planId
                            </code> */}
                          </div>
                          <div
                            class="line number3 index2 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              'https://vmpautomation.prod.vmware.cba/catalog/api/items/8cead778-b3ab-3eab-bd38-b36958f723f4/request'
                              \
                            </code>
                            {/* <code class="csharp plain">: GUID,</code> */}
                          </div>

                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              {" "}
                              --header 'Authorization: Bearer {"<<token>>"}' \
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              {" "}
                              --header 'Accept: application/json' \
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number5 index4 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              --header 'Content-Type: application/json' \
                            </code>
                            {/* <code class="csharp plain">: TROUXID,</code> */}
                          </div>
                          <div
                            class="line number6 index5 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">--data-raw '{"{"}</code>
                            {/* <code class="csharp plain">: DC, </code> */}
                            {/* <code class="csharp comments">
                              // DURHAM-DEV, RR2C-NONPROD, DURHAM-PROD,
                              PC1-PROD, S3B-PROD, LIMERICK-PROD,
                              LIMERICK-NONPROD
                            </code> */}
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">
                              "projectId":
                              "1d92422f-39f9-45a9-b461-8004976bd9b3"
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number9 index8 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">{"}'"}</code>
                            {/* <code class="csharp plain">: </code>
                            <code class="csharp string">"ON or OFF"</code>
                            <code class="csharp plain">, </code>
                            <code class="csharp comments">// ON/OFF</code> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <div
          class="code panel pdl conf-macro output-block"
          style={{ borderWidth: 1 }}
          data-hasbody="true"
          data-macro-name="code"
        >
          <div
            class="codeHeader panelHeader pdl"
            style={{ borderBottomWidth: 1 }}
          >
            <b>
              Step 4: Payload to change the default values for requesting
              'Windows Server {"(DevBox)"}'
            </b>
          </div>
          <div class="codeContent panelContent pdl">
            <div>
              <div
                id="highlighter_261927"
                class="syntaxhighlighter sh-midnight csharp"
              >
                <table border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="gutter">
                        <div class="line number1 index0 alt2">1</div>
                        <div class="line number2 index1 alt1">2</div>
                        <div class="line number3 index2 alt2">3</div>
                        <div class="line number4 index3 alt1">4</div>
                        <div class="line number5 index4 alt2">5</div>
                        <div class="line number6 index5 alt1">6</div>
                        <div class="line number7 index6 alt2">7</div>
                        <div class="line number8 index7 alt1">8</div>
                      </td>
                      <td class="code">
                        <div
                          class="container"
                          title="Hint: double-click to select code"
                        >
                          {/* <div
                            class="line number1 index0 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp plain">{"{"}</code>
                          </div> */}
                          <div
                            class="line number2 index1 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">curl -X POST \</code>
                            {/* <code class="csharp plain">: GUID,&nbsp; </code> */}
                            {/* <code class="csharp comments">
                              // Your existing planId
                            </code> */}
                          </div>
                          <div
                            class="line number3 index2 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              'https://vmpautomation.prod.vmware.cba/catalog/api/items/8cead778-b3ab-3eab-bd38-b36958f723f4/request'
                              \
                            </code>
                            {/* <code class="csharp plain">: GUID,</code> */}
                          </div>
                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              {" "}
                              --header 'Accept: application/json' \
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number5 index4 alt2"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">
                              --header 'Authorization: Bearer {"<<token>>"}' \
                            </code>
                            {/* <code class="csharp plain">: TROUXID,</code> */}
                          </div>
                          <div
                            class="line number6 index5 alt1"
                            data-bidi-marker="true"
                          >
                            {/* <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code> */}
                            <code class="csharp string">--data-raw '{"{"}</code>
                            {/* <code class="csharp plain">: DC, </code> */}
                            {/* <code class="csharp comments">
                              // DURHAM-DEV, RR2C-NONPROD, DURHAM-PROD,
                              PC1-PROD, S3B-PROD, LIMERICK-PROD,
                              LIMERICK-NONPROD
                            </code> */}
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">
                              "projectId":
                              "1d92422f-39f9-45a9-b461-8004976bd9b3",
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"inputs": {"{"}</code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>

                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"vCPU": 4,</code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>

                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">
                              "ramGb": 16,<br></br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk1Letter":
                              "E",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk1SizeGB":
                              10,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"extraDiskCount":
                              1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              "extraDiskFormat": "NTFS",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk2Letter":
                              "F",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              "disk2SizeGB": 1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk3Letter":
                              "G",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk3SizeGB":
                              1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk4Letter":
                              "H",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk4SizeGB":
                              1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk5Letter":
                              "I",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disk5SizeGB":
                              1
                            </code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>

                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">{"}"}</code>
                            {/* <code class="csharp plain">: {"{"}</code> */}
                          </div>
                          <div
                            class="line number9 index8 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">{"}'"}</code>
                            {/* <code class="csharp plain">: </code>
                            <code class="csharp string">"ON or OFF"</code>
                            <code class="csharp plain">, </code>
                            <code class="csharp comments">// ON/OFF</code> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
