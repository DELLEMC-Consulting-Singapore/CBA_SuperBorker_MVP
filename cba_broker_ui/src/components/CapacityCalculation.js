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
    subTitle="This feature will be developed for Phase 2 initiative."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
export default CapacityCalculation;
