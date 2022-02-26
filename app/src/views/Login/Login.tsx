import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { LoginForm } from "../../components/Forms/User";

import { HeroContent, HeroLayout } from "../common";
import useLoginFormProps from "./useLoginFormProps";

function Login() {
  const { loading, ...loginFormProps } = useLoginFormProps();
  return (
    <HeroLayout>
      <HeroContent>
        {loading ? (
          <Spin indicator={<LoadingOutlined />}>
            <LoginForm {...loginFormProps} />
          </Spin>
        ) : (
          <LoginForm {...loginFormProps} />
        )}
      </HeroContent>
    </HeroLayout>
  );
}

export default Login;
