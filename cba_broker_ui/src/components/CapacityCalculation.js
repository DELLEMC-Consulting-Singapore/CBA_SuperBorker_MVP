import React from "react";
import { Button, Result } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
const CapacityCalculation = () => (
  <Result
    status="404"
    title="404"
    subTitle={
      <b style={{ fontSize: 20 }}>
        This feature will be developed for Phase 2 initiative.
      </b>
    }
    extra={
      <Link to="/">
        <Button
          type="primary"
          style={{
            backgroundColor: "#fc0",
            color: "#231f20",
          }}
        >
          Back Dashboard
        </Button>
      </Link>
    }
  />
);
export default CapacityCalculation;
