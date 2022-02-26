import { useLocation } from "react-router-dom";

import styled from "@emotion/styled";

import { Form, Button, Typography, Space, FormProps, Divider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";

import * as Fields from "./Fields";
import { AuthRole } from "../../../app/auth";

export interface ProfileFormData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  authRole: AuthRole;
  verified: boolean;
}

const Buttons = styled(Space)`
  width: 100%;
`;

const Header = styled(Form.Item)`
  text-align: center;
  padding: 0.5em;
`;

const Policies = styled(Typography.Text)`
  display: block;
  font-size: 0.9em;
`;

interface ProfileFormProps extends FormProps<ProfileFormData> {
  onSave: () => Promise<void>;
}

function ProfileForm({ onSave, ...props }: ProfileFormProps) {
  const { state: rawState } = useLocation();
  const state = rawState as { email?: string; password?: string } | undefined;

  const [form] = useForm(props.form);

  return (
    <Form<ProfileFormData>
      name="profile"
      onFinish={onSave}
      labelCol={{ span: 8 }}
      {...props}
      form={form}
    >
      <Header>
        <Typography.Title level={2}>
          <UserAddOutlined /> Register
        </Typography.Title>
        <Typography.Paragraph>
          To help us manage and organise press tickets, we ask that you create an account on our
          ticketing portal.
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          Please note that Felix only accepts submissions from current students, staff, or alumni of
          Imperial College London.
        </Typography.Paragraph>
      </Header>

      <Fields.FullName
        placeholder="Alan Turing"
        tooltip="This will be your display name, you can still change how your name will appear in print later on."
      />

      <Fields.Email
        inputProps={{ defaultValue: state?.email }}
        tooltip="You do not have to use your Imperial email address, though this may speed up the verification process."
        placeholder="a.turing@princeton.edu"
      />

      <Fields.Password
        inputProps={{ defaultValue: state?.password }}
        placeholder="HuN9ryF0rApp1e5?"
        tooltip="Please ensure your password is greater than 6 characters long."
      />

      <Form.Item>
        <Buttons direction="vertical">
          <Button type="primary" htmlType="submit" block icon={<SmileOutlined />}>
            Create Account
          </Button>
        </Buttons>
      </Form.Item>

      <Policies type="secondary">
        By creating an account you are agreeing to and accepting our{" "}
        <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>. See links for
        further details.
      </Policies>
    </Form>
  );
}

export default ProfileForm;
