import React from "react";
import { Typography } from "antd";

import "./css/batch.css";
import "./css/sh_theme.css";
export const Integrations = () => {
  return (
    <>
      <h2>
        Registering a new services endpoint with Open Service Broker
        Integration: A Technical Guide
      </h2>
      <Typography.Text>
        In the realm of automation, integrating various services seamlessly is
        essential for streamlining workflows and enhancing efficiency.
        Leveraging Open Service Broker, along with suitable APIs or scripts, can
        significantly contribute to achieving this goal. In this technical
        article, we'll explore the process of identifying a use case, developing
        the backend workflow, implementing it using Python and Flask, and
        finally releasing the endpoint for generic use.
      </Typography.Text>
      <ul>
        <li>
          <h3>Identifying the Use Case</h3>
          <Typography.Paragraph>
            Before delving into automation, it's crucial to identify a suitable
            use case. Let's consider a scenario where a company needs to
            automate the provisioning of cloud resources for development
            environments. This process involves multiple steps, such as resource
            allocation, configuration, and validation.
          </Typography.Paragraph>
        </li>
        <li>
          <h3>Product APIs and Scripts</h3>
          <Typography.Paragraph>
            For this use case, we'll utilize the APIs provided by the cloud
            service provider, such as AWS or Azure, to interact with their
            infrastructure programmatically. Additionally, scripts can be
            employed to automate specific tasks within the workflow, such as
            environment setup and validation checks.
          </Typography.Paragraph>
        </li>
        <li>
          <h3>Developing the Backend Workflow</h3>
          <Typography.Paragraph>
            The backend workflow can be divided into three main phases:
            Pre-execution, Execution, and Post-execution. Each phase performs
            specific tasks to ensure a smooth automation process.
          </Typography.Paragraph>
          <b>Pre-execution:</b>
          <Typography.Paragraph>
            Authentication with the cloud service provider. <br />
            Validation of input parameters. <br />
            Checking resource availability.
          </Typography.Paragraph>
          <b>Execution:</b>
          <Typography.Paragraph>
            Provisioning of cloud resources.
            <br />
            Configuration of the environment. <br />
            Integration with existing systems.
          </Typography.Paragraph>
          <b>Post-execution:</b>
          <Typography.Paragraph>
            Validation of the provisioned resources.
            <br />
            Notification of completion. <br />
            Error handling and rollback procedures.
          </Typography.Paragraph>
        </li>

        <li>
          <h3>Developing Python Code with Flask</h3>
          <Typography.Paragraph>
            Now, let's develop the backend workflow using Python and Flask to
            create a service endpoint for end-users to consume via APIs or
            existing automation processes.
          </Typography.Paragraph>

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
              <b>python</b>
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
                          <div class="line number8 index7 alt1">9</div>
                          <div class="line number8 index7 alt1">10</div>
                          <div class="line number8 index7 alt1">11</div>
                          <div class="line number8 index7 alt1">12</div>
                          <div class="line number8 index7 alt1">13</div>
                          <div class="line number8 index7 alt1">14</div>
                          <div class="line number8 index7 alt1">15</div>
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
                              <code class="csharp string">
                                <span style={{ color: "#0672cb" }}>from</span>{" "}
                                <span style={{ color: "#fff" }}>flask</span>{" "}
                                <>
                                  <span style={{ color: "#0672cb" }}>
                                    import{" "}
                                  </span>{" "}
                                  <span style={{ color: "#fff" }}>
                                    Flask, request, jsonify
                                  </span>{" "}
                                </>
                              </code>
                            </div>
                            <div
                              class="line number3 index2 alt2"
                              data-bidi-marker="true"
                            >
                              <code class="csharp string">
                                <span style={{ color: "#fff" }}>
                                  app = Flask(__name__)
                                </span>
                              </code>
                            </div>
                            <br />
                            <div
                              class="line number4 index3 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp string">
                                {" "}
                                <span style={{ color: "#ACB0B0" }}>
                                  @app.route(
                                </span>
                                '/provision'
                                <span style={{ color: "#ACB0B0" }}>
                                  , methods=[
                                </span>
                                'POST'
                                <span style={{ color: "#ACB0B0" }}>])</span>
                              </code>
                             </div>
                            <div
                              class="line number5 index4 alt2"
                              data-bidi-marker="true"
                            >
                              <code class="csharp string">
                                <span style={{ color: "#0672cb" }}>def</span>{" "}
                                <span style={{ color: "#DF1111" }}>
                                  provision_resources
                                </span>
                                <span style={{ color: "#fff" }}>():</span>
                              </code>
                              </div>
                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#ACB0B0" }}>
                                  # Parse Request Parameters
                                </span>
                              </code>
                            </div>
                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#fff" }}>
                                  data = request.json
                                </span>
                              </code>
                            </div>

                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#ACB0B0" }}>
                                  # Perform pre-execution tasks
                                </span>
                              </code>
                            </div>

                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#ACB0B0" }}>
                                  # Execute Provisioning Workflow
                                </span>
                              </code>
                            </div>
                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#ACB0B0" }}>
                                  # Perform post-execution tasks
                                </span>
                              </code>
                            </div>

                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#0672cb" }}>return</span>
                                <span style={{ color: "#fff" }}> jsonify(</span>
                                {
                                  "{'message':'Resources provisioned successfully'}"
                                }
                                <span style={{ color: "#fff" }}>)</span>
                              </code>
                            </div>
                            <br />
                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces"></code>
                              <code class="csharp string">
                                <span style={{ color: "#0672cb" }}>if</span>
                                <span style={{ color: "#fff" }}>
                                  __name__ == '__main__':
                                </span>
                              </code>
                            </div>
                            <div
                              class="line number6 index5 alt1"
                              data-bidi-marker="true"
                            >
                              <code class="csharp spaces">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </code>
                              <code class="csharp string">
                                <span style={{ color: "#fff" }}>
                                  app.run(debug=
                                </span>
                                <span style={{ color: "#0672cb" }}>True</span>
                                <span style={{ color: "#fff" }}>)</span>
                              </code>
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
        </li>

        <li>
          <h3>Mapping Services Endpoint to Catalog Items</h3>
          <Typography.Paragraph>
            To enhance functionality, we can map the exposed services endpoint
            to catalog items or existing workflows. This allows users to easily
            access and utilize the automation capabilities offered.
          </Typography.Paragraph>
        </li>
        <li>
          <h3>Testing and Release</h3>
          <Typography.Paragraph>
            Before rolling out the automation solution into production, it's
            essential to perform thorough feature testing and integration
            testing to ensure reliability and compatibility with existing
            systems. Once testing is successful, build comprehensive
            documentation and release the endpoint for generic use.
          </Typography.Paragraph>
        </li>

        <li>
          <h3>Conclusion</h3>
          <ul>
            <li>
              <Typography.Paragraph>
                By integrating Open Service Broker, leveraging relevant APIs and
                scripts, and developing a robust backend workflow with Python
                and Flask, organizations can streamline automation processes
                effectively. This not only enhances efficiency but also enables
                seamless integration with existing systems and workflows,
                ultimately driving productivity and innovation.
              </Typography.Paragraph>
            </li>
            <li>
              <Typography.Paragraph>
                This technical guide provides a framework for automating use
                cases and delivering scalable, reliable solutions in today's
                dynamic IT landscape.
              </Typography.Paragraph>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};
