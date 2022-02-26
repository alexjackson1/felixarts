import { Link } from "react-router-dom";

import { Button, Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import useLogout from "./useLogout";

const ErrorResult = (
  <Result
    status="error"
    title="There was an error signing you out."
    extra={[
      <Button key="home">
        <Link to="/">Go Home</Link>
      </Button>,
    ]}
  />
);

const LoadingResult = <Result icon={<LoadingOutlined />} title="Signing you out..." />;

const SuccessResult = (
  <Result
    status="success"
    title="You're signed out!"
    extra={[
      <Button type="primary" key="signin">
        <Link to="/login">Sign Back In</Link>
      </Button>,
      <Button key="buy">
        <Link to="/">Go Home</Link>
      </Button>,
    ]}
  />
);

function Logout() {
  const { loading, error } = useLogout();
  if (error) return ErrorResult;
  if (loading) return LoadingResult;
  return SuccessResult;
}

export default Logout;
