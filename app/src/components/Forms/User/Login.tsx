import React from "react";
import { Link } from "react-router-dom";

import styled from "@emotion/styled";

import { Form, Button, Typography, Space, FormProps } from "antd";
import { LoginOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";

import { LoginData } from "../../../app/auth";

import * as Fields from "./Fields";
import Logo from "../../Logo";

export type LoginFormData = LoginData;

/**
 * Forgot password link component.
 */
const ForgotPassword = styled(Link)`
  float: right;
`;

/**
 * Buttons container component.
 */
const Buttons = styled(Space)`
  width: 100%;
`;

/**
 * Login form header component.
 */
const Header = styled(Form.Item)`
  text-align: center;
  padding: 0.5em;

  .felixarts-logo {
    margin-bottom: 0.5em;
  }
`;

/**
 * Login form props
 */
interface LoginFormProps extends FormProps<LoginFormData> {
  signIn: () => void;
  register: () => void;
}

/**
 * A login form that controls its own loading state.
 */
function LoginForm({ form, signIn, register, ...props }: LoginFormProps) {
  return (
    <Form<LoginFormData> name="login" onFinish={signIn} {...props} form={form}>
      <Header>
        <Logo />

        <Typography.Title level={2}>
          <UserOutlined /> Sign In
        </Typography.Title>

        <Typography.Paragraph strong>
          Welcome back to the Felix Arts assignment portal!
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          Please sign in using your email and password below, or register for an account if you
          haven&apos;t already.
        </Typography.Paragraph>
      </Header>

      <Fields.Email label={undefined} />
      <Fields.Password label={undefined} />
      <Form.Item>
        <ForgotPassword to="/forgot">Forgot password</ForgotPassword>
      </Form.Item>

      <Form.Item>
        <Buttons direction="vertical">
          <Button type="primary" htmlType="submit" block icon={<LoginOutlined />}>
            Sign In
          </Button>
          <Button block icon={<UserAddOutlined />} onClick={register}>
            Create New Account
          </Button>
        </Buttons>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
