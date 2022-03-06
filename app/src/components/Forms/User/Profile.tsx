import styled from "@emotion/styled";

import { Form, Typography, FormProps, Divider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { SmileOutlined } from "@ant-design/icons";

import { User, WithPassword } from "../../../app/auth";

import * as Fields from "./Fields";
import SaveButtons from "../SaveButtons";

const Header = styled(Form.Item)`
  padding: 0.5em;
`;

interface ProfileFormProps extends FormProps<WithPassword<Omit<User, "id">>> {
  onSave: (values: WithPassword<Omit<User, "id">>) => void;
  onClear: () => void;
  name: string;
}

function ProfileForm({ name, onSave, onClear, ...props }: ProfileFormProps) {
  const [form] = useForm(props.form);

  return (
    <Form<WithPassword<Omit<User, "id">>>
      name="profile"
      onFinish={onSave}
      onReset={onClear}
      labelCol={{ span: 8 }}
      {...props}
      form={form}
    >
      <Header>
        <Typography.Title level={2}>
          <SmileOutlined style={{ marginRight: 5 }} /> {name}
        </Typography.Title>
        <Typography.Paragraph>
          Update your user account profile here. This information will not affect what name(s)
          appear in print — but it does help us keep track of active writers.
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          To set how you would like your name to appear in print, and more, check your author
          settings on the left-hand menu.
        </Typography.Paragraph>
      </Header>

      <Fields.FullName tooltip="Please enter your full name here." />
      <Fields.DisplayName tooltip="This will be your display name, you can still change how your name will appear in print later on." />
      <Divider />
      <Fields.Email
        tooltip="You do not have to use your Imperial email address, though this may speed up the verification process."
        placeholder="a.turing@princeton.edu"
      />
      <Fields.Password
        placeholder="HuN9ryF0rApp1e5?"
        tooltip="Please ensure your password is greater than 6 characters long."
      />
      <Divider />
      <Fields.Verified disabled={true} />
      <Fields.Role disabled={true} />

      <SaveButtons />
    </Form>
  );
}

export default ProfileForm;
