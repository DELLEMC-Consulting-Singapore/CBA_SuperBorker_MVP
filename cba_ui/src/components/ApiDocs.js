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
            <b>API</b>
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
                        <div class="line number9 index8 alt2">9</div>
                        <div class="line number10 index9 alt1">10</div>
                        <div class="line number11 index10 alt2">11</div>
                        <div class="line number12 index11 alt1">12</div>
                        <div class="line number13 index12 alt2">13</div>
                        <div class="line number14 index13 alt1">14</div>
                        <div class="line number15 index14 alt2">15</div>
                        <div class="line number16 index15 alt1">16</div>
                        <div class="line number17 index16 alt2">17</div>
                        <div class="line number18 index17 alt1">18</div>
                        <div class="line number19 index18 alt2">19</div>
                        <div class="line number20 index19 alt1">20</div>
                        <div class="line number21 index20 alt2">21</div>
                        <div class="line number22 index21 alt1">22</div>
                        <div class="line number23 index22 alt2">23</div>
                      </td>
                      <td class="code">
                        <div
                          class="container"
                          title="Hint: double-click to select code"
                        >
                          <div
                            class="line number1 index0 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp plain">{"{"}</code>
                          </div>
                          <div
                            class="line number2 index1 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"plan_id"</code>
                            <code class="csharp plain">: GUID,&nbsp; </code>
                            <code class="csharp comments">
                              // Your existing planId
                            </code>
                          </div>
                          <div
                            class="line number3 index2 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"service_id"</code>
                            <code class="csharp plain">: GUID,</code>
                          </div>
                          <div
                            class="line number4 index3 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"parameters"</code>
                            <code class="csharp plain">: {"{"}</code>
                          </div>
                          <div
                            class="line number5 index4 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"trouxId"</code>
                            <code class="csharp plain">: TROUXID,</code>
                          </div>
                          <div
                            class="line number6 index5 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"datacenter"</code>
                            <code class="csharp plain">: DC, </code>
                            <code class="csharp comments">
                              // DURHAM-DEV, RR2C-NONPROD, DURHAM-PROD,
                              PC1-PROD, S3B-PROD, LIMERICK-PROD,
                              LIMERICK-NONPROD
                            </code>
                          </div>
                          <div
                            class="line number7 index6 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"parameters"</code>
                            <code class="csharp plain">: {"{"}</code>
                          </div>
                          <div
                            class="line number8 index7 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">"vmPower"</code>
                            <code class="csharp plain">: {"{"}</code>
                          </div>
                          <div
                            class="line number9 index8 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">"vmPowerState"</code>
                            <code class="csharp plain">: </code>
                            <code class="csharp string">"ON or OFF"</code>
                            <code class="csharp plain">, </code>
                            <code class="csharp comments">// ON/OFF</code>
                          </div>
                          <div
                            class="line number10 index9 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">"vmName"</code>
                            <code class="csharp plain">: </code>
                            <code class="csharp string">"XXXX"</code>
                            <code class="csharp plain">,</code>
                          </div>
                          <div
                            class="line number11 index10 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp string">"isProdVM"</code>
                            <code class="csharp plain">: </code>
                            <code class="csharp keyword">false</code>
                            <code class="csharp plain">, &nbsp;</code>
                            <code class="csharp comments">//false/true</code>
                          </div>
                          <div
                            class="line number12 index11 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">
                              "powerOptionDropdownForOn"
                            </code>
                            <code class="csharp plain">: {"{"} </code>
                            <code class="csharp comments">
                              //Shutdown/Reboot
                            </code>
                          </div>
                          <div
                            class="line number13 index12 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">"powerOption"</code>
                            <code class="csharp plain">: </code>
                            <code class="csharp string">
                              "Shutdown or Reboot"
                            </code>
                            <code class="csharp plain">, &nbsp;</code>
                            <code class="csharp comments">
                              //Shutdown/Reboot
                            </code>
                          </div>
                          <div
                            class="line number14 index13 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">
                              "standardChangeOptionDropdown"
                            </code>
                            <code class="csharp plain">: {"{"}</code>
                          </div>
                          <div
                            class="line number15 index14 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">"environmentVM"</code>
                            <code class="csharp plain">: </code>
                            <code class="csharp string">"N"</code>
                            <code class="csharp comments">//N/P</code>
                          </div>
                          <div
                            class="line number16 index15 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </code>
                            <code class="csharp plain">{"}"},</code>
                          </div>
                          <div
                            class="line number17 index16 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp string">
                              "standardChangeNumber"
                            </code>
                            <code class="csharp plain">: </code>
                            <code class="csharp string">"CHG0584935"</code>
                            <code class="csharp comments">
                              //Not provided value if Reboot Non-Prod VM
                            </code>
                          </div>
                          <div
                            class="line number18 index17 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp plain">{"}"}</code>
                          </div>
                          <div
                            class="line number19 index18 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                            </code>
                            <code class="csharp plain">
                              {"}"}&nbsp; &nbsp; &nbsp; &nbsp;
                            </code>
                          </div>
                          <div
                            class="line number20 index19 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp plain">{"}"},</code>
                          </div>
                          <div
                            class="line number21 index20 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp string">"updateType"</code>
                            <code class="csharp plain">: </code>
                            <code class="csharp string">"vm_power"</code>
                          </div>
                          <div
                            class="line number22 index21 alt1"
                            data-bidi-marker="true"
                          >
                            <code class="csharp spaces">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </code>
                            <code class="csharp plain">{"}"}</code>
                          </div>
                          <div
                            class="line number23 index22 alt2"
                            data-bidi-marker="true"
                          >
                            <code class="csharp plain">{"}"}</code>
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
