import { Checkbox, Form } from "antd";
import { FormItemProps, Rule } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { DisabledProps, ItemProps, Name } from "../CommonFields";
import TitleSelect from "./TitleSelect";

export const rules: Record<string, Rule[]> = {
  title: [],
  bio: [],
  name: [{ required: true, message: "Please enter an author name." }],
  pseudonym: [],
};

export function AuthorName({ placeholder = "A. M. Turing", ...props }: ItemProps) {
  return <Name label="Author Name" name="name" placeholder={placeholder} {...props} />;
}

export function Title({ ...props }: FormItemProps) {
  return (
    <Form.Item label="Title" name="title" rules={rules.title} {...props}>
      <TitleSelect />
    </Form.Item>
  );
}

export function Bio({ placeholder = "A short description of yourself...", ...props }: ItemProps) {
  return (
    <Form.Item label="Bio" name="bio" rules={rules.bio} {...props}>
      <TextArea placeholder={placeholder} />
    </Form.Item>
  );
}

export function Pseudonym({ disabled, ...props }: DisabledProps) {
  return (
    <Form.Item
      label="Pseudonym"
      name="pseudonym"
      rules={rules.pseudonym}
      valuePropName="checked"
      {...props}
    >
      <Checkbox disabled={disabled} />
    </Form.Item>
  );
}
