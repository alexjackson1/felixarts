import styled from "@emotion/styled";

import { Form, Typography, Space, FormProps } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormOutlined } from "@ant-design/icons";

import * as Fields from "./Fields";
import SaveButtons from "../SaveButtons";
import { Author } from "../../../app/types";

const Header = styled(Form.Item)`
  padding: 0.5em;
`;

interface ProfileFormProps extends FormProps<Omit<Author, "id">> {
  onSave: (values: Omit<Author, "id">) => void;
  onClear: () => void;
  name: string;
}

function ProfileForm({ name, onSave, onClear, ...props }: ProfileFormProps) {
  const [form] = useForm(props.form);

  return (
    <Form<Omit<Author, "id">>
      name="profile"
      onFinish={onSave}
      onReset={onClear}
      labelCol={{ span: 8 }}
      {...props}
      form={form}
    >
      <Header>
        <Typography.Title level={2}>
          <FormOutlined style={{ marginRight: 5 }} /> Author Profile: {name}
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

      <Fields.Title />
      <Fields.AuthorName tooltip="Please enter your name (or pseudonym) as you would like it to appear in print." />
      <Fields.Bio />
      <Fields.Pseudonym disabled />

      <SaveButtons />
    </Form>
  );
}

export default ProfileForm;
