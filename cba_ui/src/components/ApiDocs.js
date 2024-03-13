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
            <b>Below details refers to the OpenServiceBroker's API payoad to make a request to DevBox provisioning by using the IaC scripts or other programming languages</b>
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
                          <div
                            class="line number2 index1 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp string">curl --location --request POST \</code>
                          </div>
                          <div
                            class="line number3 index2 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp string">
                            'http://10.45.197.10:5000/api/devbox/create' \
                            </code>
                          </div>
                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp string">
                              {" "}
                              --header 'Accept: application/json' \
                            </code>
                          </div>
                          <div
                            class="line number6 index5 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp string">--data-raw '{"{"}</code>
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">
                              "lan_id": "yourLANID",
                            </code>
                          </div>
                          <div
                            class="line number8 index7 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; {"  "}
                            </code>
                            <code class="csharp string">
                              "lan_password": "yourLANPW"
                            </code>
                          </div>
                          <div
                            class="line number8 index7 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; {"  "}
                            </code>
                            <code class="csharp string">
                              "source": "API"
                            </code>
                          </div>
                          <div
                            class="line number9 index8 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">{"}'"}</code>
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
